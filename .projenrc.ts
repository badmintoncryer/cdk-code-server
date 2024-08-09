import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Kazuho CryerShinozuka',
  authorAddress: 'malaysia.cryer@gmail.com',
  cdkVersion: '2.120.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.4.0',
  name: 'cdk-code-server',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/badmintoncryer/cdk-code-server.git',
  keywords: ['aws', 'cdk', 'ec2', 'nodejs', 'aws-cdk', 'vscode'],
  gitignore: ['*.js', '*.d.ts', '!test/.*.snapshot/**/*', '.tmp'],

  deps: [
    '@open-constructs/aws-cdk',
    'cdk-preinstalled-amazon-linux-ec2',
  ],
  description: 'CDK Construct for a VSCode Server development environment on EC2',
  devDeps: [
    '@aws-cdk/integ-runner@2.120.0-alpha.0',
    '@aws-cdk/integ-tests-alpha@2.120.0-alpha.0',
  ],
  releaseToNpm: true,
  packageName: 'cdk-code-server',
  publishToPypi: {
    distName: 'cdk-code-server',
    module: 'cdk_code-server',
  },
});
project.projectBuild.testTask.exec(
  'yarn tsc -p tsconfig.dev.json && yarn integ-runner',
);
project.synth();
