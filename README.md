# CDK VSCode Server Construct

This is a CDK Construct for creating a VSCode server on an Amazon Linux EC2 instance.

You can access to Visual Studio Code server by browser and start development easily.

[![View on Construct Hub](https://constructs.dev/badge?package=cdk-code-server)](https://constructs.dev/packages/cdk-code-server)

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/badmintoncryer/cdk-code-server)
[![npm version](https://badge.fury.io/js/cdk-code-server.svg)](https://badge.fury.io/js/cdk-code-server)
[![Build Status](https://github.com/badmintoncryer/cdk-code-server/actions/workflows/build.yml/badge.svg)](https://github.com/badmintoncryer/cdk-code-server/actions/workflows/build.yml)
[![Release Status](https://github.com/badmintoncryer/cdk-code-server/actions/workflows/release.yml/badge.svg)](https://github.com/badmintoncryer/cdk-code-server/actions/workflows/release.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm downloads](https://img.shields.io/npm/dm/cdk-code-server.svg?style=flat)](https://www.npmjs.com/package/cdk-code-server)

## Usage

Install the package:

```bash
npm install cdk-code-server
```

Use it in your CDK stack:

```typescript
import { CodeServer } from 'cdk-code-server';

new CodeServer(this, 'CodeServer');
```



After the stack is deployed, you can access to the server via EC2 instance connect endpoint(EIC endpoint) and create connection to the VSCode server:

```bash
$ ssh ec2-user@<public-ip>
$ node --version
v20.13.1
$ code --version
1.89.1
$ git --version
git version 2.39.3
```

## user data

Installation of software is done by user data script. You can see the script in the `src/index.ts` file.

```typescript
// Install Node.js
userData.addCommands(
  'touch ~/.bashrc',
  'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash',
  'source ~/.bashrc',
  'export NVM_DIR="$HOME/.nvm"',
  '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"',
  `nvm install ${props.nodeJsVersion ?? '--lts'}`,
  // Note that the above will install nvm, node and npm for the root user.
  // It will not add the correct ENV VAR in ec2-user's environment.
  `cat <<EOF >> /home/ec2-user/.bashrc
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF`);
```

Ofcourse, you can customize the additional user data script by calling `instance.userData.addCommands()` method.

```typescript
declare const instance: PreinstalledAmazonLinuxInstance;

// install yarn
instance.userData.addCommands(
  'npm install -g yarn'
);
```
