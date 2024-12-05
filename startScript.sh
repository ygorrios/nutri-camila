#!/bin/bash

ENVIRONMENT="$1"

# REGION="eu-west-1"

# # AWS Secrets Manager ARN format
# SECRET_ID="nutri-camila"

# # Attempt to fetch the secret value from AWS Secrets Manager
# SECRET_JSON=$(aws secretsmanager get-secret-value --region $REGION --secret-id $SECRET_ID --query 'SecretString' --output text)

# if [ $? -eq 0 ]; then
#   # Parse the JSON and export each key-value pair as an environment variable
#   echo "Successfully retrieved the secret."
#   while IFS= read -r line; do
#       # Remove leading and trailing spaces
#       line="${line#"${line%%[![:space:]]*}"}"
#       line="${line%"${line##*[![:space:]]}"}"

#       # Skip empty lines and comments
#       if [ -n "$line" ] && [[ "$line" != \#* ]]; then
#         # Parse JSON key and value
#         key="${line%%:*}"
#         value="${line#*:}"
#         # Remove leading and trailing spaces from key and value
#         key="${key#"${key%%[![:space:]]*}"}"
#         key="${key%"${key##*[![:space:]]}"}"
#         value="${value#"${value%%[![:space:]]*}"}"
#         value="${value%"${value##*[![:space:]]}"}"
        
#         # Transform key to a valid variable name (replace non-alphanumeric characters)
#         key="$(echo "$key" | sed 's/^[^A-Za-z0-9]*//; s/[^A-Za-z0-9_]*$//; s/[^A-Za-z0-9_]/_/g')"
#         value=$(echo "$value" | tr -d '"')
#         # echo "key: $key, value: $value"
#         if [ "$key" = "AUTH_URL" ]; then
#           export "$key=http://localhost:3007"
#         else
#           export "$key=$value"
#         fi
#       fi
#     done < <(echo "$SECRET_JSON" | jq -r 'to_entries | .[] | "\(.key): \(.value)"')
# else
#   # An error occurred
#   echo "Error: Failed to retrieve the secret '$SECRET_ID' from AWS Secrets Manager"
#   exit 1
# fi

# # Collect environment variables to pass to Docker
# DOCKER_ENV_VARS=$(env | grep -E '^(AUTH_SECRET|AUTH_URL)=' | sed 's/^/-e /' | tr '\n' ' ')

# Check if the value of $1 is 'docker'
if [ "$ENVIRONMENT" = "docker" ]; then
  docker run $DOCKER_ENV_VARS -p 3000:3000 quick-register-docker
elif  [ "$ENVIRONMENT" = "build" ]; then
  echo "run build"
  pnpm build:standalone
elif  [ "$ENVIRONMENT" = "start" ]; then
  export "IS_LOCALHOST=TRUE"
  echo "run prod"
  next start -p 3007
elif  [ "$ENVIRONMENT" = "prod" ]; then
  export "IS_LOCALHOST=TRUE"
  echo "run build"
  pnpm next-build
  echo "run prod"
  next start -p 3007
elif  [ "$ENVIRONMENT" = "dev" ]; then
  export "IS_LOCALHOST=TRUE"
  echo "run dev"
  next dev -p 3007 --turbopack
else
  echo "Invalid environment: $ENVIRONMENT"
fi
