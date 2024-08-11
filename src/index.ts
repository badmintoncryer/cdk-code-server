import * as ocf from '@open-constructs/aws-cdk';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PreinstalledAmazonLinuxInstance, PreinstalledSoftwarePackage } from 'cdk-preinstalled-amazon-linux-ec2';
import { Construct } from 'constructs';

/**
 * Properties for CodeServer construct
 */
export interface CodeServerProps {
  /**
   * The VPC where the instance will be deployed
   *
   * @default - A new VPC will be created
   */
  readonly vpc?: ec2.IVpc;

  /**
   * The instance type
   *
   * @default - C7g.2xlarge
   */
  readonly instanceType?: ec2.InstanceType;

  /**
   * The CPU type
   *
   * @default - ARM_64
   */
  readonly cpuType?: ec2.AmazonLinuxCpuType;

  /**
   * The IAM policy to attach to the instance role
   *
   * @default - Allow all actions on all resources
   */
  readonly policy?: iam.PolicyStatement;

  /**
   * The size of the root volume in GiB
   *
   * @default 30
   */
  readonly volumeSize?: number;

  /**
   * User data to run when launching the instance
   *
   * @default - No additional user data
   */
  readonly userData?: string[];
}

/**
 * A CodeServer Construct
 */
export class CodeServer extends Construct {
  constructor(scope: Construct, id: string, props: CodeServerProps = {}) {
    super(scope, id);

    const vpc = props.vpc ?? new ec2.Vpc(this, 'Vpc', {
      maxAzs: 1,
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 26,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    const instance = new PreinstalledAmazonLinuxInstance(this, 'Instance', {
      vpc,
      instanceType: props.instanceType ?? ec2.InstanceType.of(
        ec2.InstanceClass.C7G,
        ec2.InstanceSize.XLARGE2,
      ),
      ssmSessionPermissions: true,
      blockDevices: [
        {
        // Attach as a root device
          deviceName: '/dev/xvda',
          volume: ec2.BlockDeviceVolume.ebs(props.volumeSize ?? 30, {
            deleteOnTermination: true,
            encrypted: false,
          }),
        },
      ],
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
        cpuType: props.cpuType ?? ec2.AmazonLinuxCpuType.ARM_64,
      }),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      preinstalledSoftware: {
        packages: [
          PreinstalledSoftwarePackage.NODEJS,
          PreinstalledSoftwarePackage.VSCODE,
          PreinstalledSoftwarePackage.GIT,
        ],
      },
    });

    instance.addUserData(
      'npm install -g yarn',
      // Install make and other build tools for setup of CDK
      "sudo dnf groupinstall -y 'Development Tools'",
      // Increase memory for Node.js
      "echo 'export NODE_OPTIONS=--max-old-space-size=8192' >> /etc/profile.d/myenv.sh",
      'chmod +x /etc/profile.d/myenv.sh',
      // Enable linger for ec2-user to allow running services without a user logged in
      'sudo loginctl enable-linger ec2-user',
    );

    if (props.userData != null && props.userData.length > 0) {
      instance.addUserData(...props.userData);
    }

    instance.addToRolePolicy(
      props.policy ?? new iam.PolicyStatement({
        actions: ['*'],
        resources: ['*'],
      }),
    );

    const eicEndpoint = new ocf.aws_ec2.InstanceConnectEndpoint(
      this,
      'InstanceConnectEndpoint',
      {
        vpc,
      },
    );

    // Opening Security Group from EIC Endpoint to EC2 Instance
    eicEndpoint.connections.allowTo(instance, ec2.Port.tcp(22));
  }
}