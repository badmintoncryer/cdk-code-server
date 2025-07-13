import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

/**
 * Properties for PreinstalledAmazonLinuxInstance
 */
export interface PreinstalledAmazonLinuxInstanceProps extends ec2.InstanceProps {
  /**
   * The software to preinstall on the instance.
   *
   * @default - no software is preinstalled
   */
  readonly preinstalledSoftware?: PreinstalledSoftware;
};

/**
 * The type of preinstalled software.
 */
export enum PreinstalledSoftwarePackage {
  /**
   * Node.js
   */
  NODEJS,
  /**
   * Docker
   */
  DOCKER,
  /**
   * Visual Studio Code
   */
  VSCODE,
  /**
   * Git
   */
  GIT,
}

/**
 * The configuration for preinstalled software.
 */
export interface PreinstalledSoftware {
  /**
   * The type of preinstalled software.
   *
   * @default - no software is preinstalled
   */
  readonly packages?: PreinstalledSoftwarePackage[];

  /**
   * Whether to install other software.
   * This is a list of software to install and passed to `dnf install <software>`
   *
   * @default - no other software is preinstalled
   */
  readonly others?: string[];
}

/**
 * Create an EC2 instance with preinstalled software.
 */
export class PreinstalledAmazonLinuxInstance extends ec2.Instance {
  constructor(scope: Construct, id: string, props: PreinstalledAmazonLinuxInstanceProps) {
    if (!(props.machineImage instanceof ec2.AmazonLinuxImage)) {
      throw new Error('Only AMAZON_LINUX, AMAZON_LINUX_2, AMAZON_LINUX_2022, and AMAZON_LINUX_2023 are supported.');
    }

    const userData = props.userData ?? ec2.UserData.forLinux();
    if (props.preinstalledSoftware != null) {
      userData.addCommands(
        'sudo dnf update -y',
      );
      const preinstalledSoftware = props.preinstalledSoftware;
      if (preinstalledSoftware.packages?.includes(PreinstalledSoftwarePackage.NODEJS)) {
        userData.addCommands(
          'touch ~/.bashrc',
          'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash',
          'source ~/.bashrc',
          'export NVM_DIR="$HOME/.nvm"',
          '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"',
          'nvm install --lts',
          `cat <<EOF >> /home/ec2-user/.bashrc
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF`,
        );
      }
      if (preinstalledSoftware.packages?.includes(PreinstalledSoftwarePackage.DOCKER)) {
        userData.addCommands(
          'sudo amazon-linux-extras install docker',
          'sudo systemctl start docker',
          'sudo systemctl enable docker',
          'sudo usermod -a -G docker ec2-user',
        );
      }
      if (preinstalledSoftware.packages?.includes(PreinstalledSoftwarePackage.VSCODE)) {
        userData.addCommands(
          'sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc',
          'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null',
          'sudo dnf check-update',
          'sudo dnf install -y code',
        );
      }
      if (preinstalledSoftware.packages?.includes(PreinstalledSoftwarePackage.GIT)) {
        userData.addCommands(
          'sudo dnf install -y git',
        );
      }
      if (preinstalledSoftware.others) {
        userData.addCommands(
          `sudo dnf install -y ${preinstalledSoftware.others.join(' ')}`,
        );
      }
    }

    const { preinstalledSoftware, ...rest } = props;
    super(scope, id, { ...rest, userData: userData });
  }
}