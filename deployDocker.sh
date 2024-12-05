#!/bin/bash

AWS_DEFAULT_REGION="eu-west-1"
AWS_ACCOUNT_ID="593791356360"
AWS_ECR_REPOSITORY_NAME="acre-intranet"
TAG="$(date +%Y_%m_%d-%H_%M)-$(git rev-parse --short HEAD)"
echo "TAG: $TAG"
AWS_TASK_DEFINITION_NAME="acre-intranet-task-definition"
AWS_CLUSTER_NAME="acre-intranet-cluster"
AWS_SERVICE_NAME="acre-intranet-service"

# # Load environment variables from AWS Secrets Manager
# SECRET_ID="acre-intranet"
# SECRET_JSON=$(aws secretsmanager get-secret-value --region $AWS_DEFAULT_REGION --secret-id $SECRET_ID --query 'SecretString' --output text)

# if [ $? -eq 0 ]; then
#   echo "Successfully retrieved the secret."
#   build_args=""
#   while IFS= read -r line; do
#       line="${line#"${line%%[![:space:]]*}"}"
#       line="${line%"${line##*[![:space:]]}"}"
#       if [ -n "$line" ] && [[ "$line" != \#* ]]; then
#         key="${line%%:*}"
#         value="${line#*:}"
#         key="${key#"${key%%[![:space:]]*}"}"
#         key="${key%"${key##*[![:space:]]}"}"
#         value="${value#"${value%%[![:space:]]*}"}"
#         value="${value%"${value##*[![:space:]]}"}"
#         key="$(echo "$key" | sed 's/^[^A-Za-z0-9]*//; s/[^A-Za-z0-9_]*$//; s/[^A-Za-z0-9_]/_/g')"
#         value=$(echo "$value" | tr -d '"')
#         export "$key=$value"
#         # Add only specific keys to build_args
#         echo "Adding $key to build args"
#         build_args+=" --build-arg $key=$value"
#       fi
#     done < <(echo "$SECRET_JSON" | jq -r 'to_entries | .[] | "\(.key): \(.value)"')
# else
#   echo "Error: Failed to retrieve the secret '$SECRET_ID' from AWS Secrets Manager"
#   exit 1
# fi

set -e

# Login to AWS ECR
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
# Build the Docker image
docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$AWS_ECR_REPOSITORY_NAME:$TAG . #$build_args
# Creating Tag the Docker image
docker tag $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$AWS_ECR_REPOSITORY_NAME:$TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$AWS_ECR_REPOSITORY_NAME:latest
# Push the Docker image to AWS ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$AWS_ECR_REPOSITORY_NAME:$TAG
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$AWS_ECR_REPOSITORY_NAME:latest

# Get the latest task definition
TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition $AWS_TASK_DEFINITION_NAME)
# Update the task definition with the new Docker image
NEW_TASK_DEFINITION=$(echo $TASK_DEFINITION | jq --arg IMAGE "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$AWS_ECR_REPOSITORY_NAME:$TAG" '.taskDefinition | .containerDefinitions[0].image=$IMAGE | del(.status, .taskDefinitionArn, .revision, .requiresAttributes, .compatibilities, .registeredAt, .registeredBy)')
# Get the task definition ARN just created
NEW_TASK_DEFINITION_ARN=$(aws ecs register-task-definition --cli-input-json "$NEW_TASK_DEFINITION" --query 'taskDefinition.taskDefinitionArn' --output text)
echo "Updating ECS service with new task definition ARN => $NEW_TASK_DEFINITION_ARN"
# Check if required environment variables are set
if [ -z "$AWS_CLUSTER_NAME" ] || [ -z "$AWS_SERVICE_NAME" ] || [ -z "$NEW_TASK_DEFINITION_ARN" ]; then
  echo "Error: One or more required environment variables are not set."
  exit 1
fi

# Update the ECS service with the new task definition ARN
output=$(aws ecs update-service --cluster $AWS_CLUSTER_NAME --service $AWS_SERVICE_NAME --task-definition $NEW_TASK_DEFINITION_ARN --force-new-deployment 2>&1)

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Service updated successfully."
  # echo "Service updated successfully. New task definition:"
  # echo "$output"
  echo "Waiting for the new task to be running..."
else
  echo "Error updating service:"
  echo "$output"
  exit 1
fi

