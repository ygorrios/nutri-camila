# Getting Started

1. Install Node  
   1.1. Windows: [Download and Install](https://nodejs.org/en/)  
   1.2. Linux: `sudo apt install nodejs`
2. Install GitBash:  
   2.1. Windows: [Download and Install](https://git-scm.com/download/win)
   2.2. Linux: [Download and Install](https://git-scm.com/download/linux)
3. Install apps on GitBash (Open as administrator):  
   3.1. Install JQ (Only for Windows): `curl -L -o /usr/bin/jq.exe https://github.com/stedolan/jq/releases/latest/download/jq-win64.exe`  
   3.2. Install NPM: `npm install -g npm`  
   3.3. Install PNPM: `curl -fsSL https://get.pnpm.io/install.sh | sh -` or `wget -qO- https://get.pnpm.io/install.sh | sh -`  
   3.4. Create environment: `cd c && mkdir www && mkdir www/branches && cd www`  
   3.5. Git clone [Acre-Intranet](https://gitlab.tds.ie/ygors/acre-intranet)
4. Gitlab SSH  
   4.1. Open PowerShell  
   4.2. Type: `ssh-keygen -o -t rsa -C "email@timedatasecurity.com"`  
   4.3. Go to C:/Users/.ssh  
   4.4. Open the file with the format ".pub"  
   4.5. Copy  
   4.6. Go to Gitlab > Preferences > SSH KEYS > ADD KEY  
   4.7. Paste the command
5. Install AWS CLI:  
   5.1. Windows: [Download and Install](https://awscli.amazonaws.com/AWSCLIV2.msi)
   5.2. Linux: [Download and Install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
6. Type `aws configure` to add your key from AWS (if you don't have yet ask any DBA)
7. Ask any DBA to allow your ip on acre-intranet security groups
8. Install JAVA 8: [jdk-8u202-windows-x64.zip](https://drive.google.com/file/d/1rDxEcWLok9mejjSk-6klQ069GTDSudgm/view?usp=drive_link)
9. Install SenchaCMD: [SenchaCmd-7.7.0.36-windows-64bit.zip](https://drive.google.com/file/d/1Czf23WsPXlKfkPkwiamWBhfJTHQzG8z6/view?usp=drive_link)
10. Install SQL Developer: [sqldeveloper-23.1.zip](https://drive.google.com/file/d/1ZOc25TALaoZjSKUUc5TFah7FjxG_HI0w/view?usp=drive_link)
11. Run this command: `cd c/www/acre-intranet && pnpm prod`
