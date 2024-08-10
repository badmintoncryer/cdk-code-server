import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { CodeServer } from '../src';

const app = new App();

class TestStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new CodeServer(this, 'CodeServer');
  }
}

const stack = new TestStack(app, 'testStack');

new IntegTest(app, 'Test', {
  testCases: [stack],
});