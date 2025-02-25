import { AddStageOpts } from 'aws-cdk-lib/pipelines';
import { JobSettings } from './pipeline';

/**
 * Options to pass to `addStageWithGitHubOpts`.
 */
export interface AddGitHubStageOptions extends AddStageOpts {
  /**
   * Run the stage in a specific GitHub Environment. If specified,
   * any protection rules configured for the environment must pass
   * before the job is set to a runner. For example, if the environment
   * has a manual approval rule configured, then the workflow will
   * wait for the approval before sending the job to the runner.
   *
   * Running a workflow that references an environment that does not
   * exist will create an environment with the referenced name.
   * @see https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment
   *
   * @default - no GitHub environment
   */
  readonly gitHubEnvironment?: string;

  /**
   * In some cases, you must explicitly acknowledge that your CloudFormation
   * stack template contains certain capabilities in order for CloudFormation
   * to create the stack.
   *
   * If insufficiently specified, CloudFormation returns an `InsufficientCapabilities`
   * error.
   *
   * @default ['CAPABILITY_IAM']
   */
  readonly stackCapabilities?: StackCapabilities[];

  /**
   * Job level settings that will be applied to all jobs in the stage.
   * Currently the only valid setting is 'if'.
   */
  readonly jobSettings?: JobSettings;

  /**
   * A role that utilizes the GitHub OIDC Identity Provider in your AWS account.
   * If supplied, this will be used instead of `awsCredentials`.
   *
   * You can create your own role in the console with the necessary trust policy
   * to allow gitHub actions from your gitHub repository to assume the role, or
   * you can utilize the `GitHubActionRole` construct to create a role for you.
   *
   * @default - GitHub repository secrets are used instead of OpenId Connect role.
   */
  readonly gitHubActionsRoleArn?: string;
}

/**
 * Acknowledge IAM resources in AWS CloudFormation templates.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#capabilities
 */
export enum StackCapabilities {
  /** Acknowledge your stack includes IAM resources */
  IAM = 'CAPABILITY_IAM',

  /** Acknowledge your stack includes custom names for IAM resources */
  NAMED_IAM = 'CAPABILITY_NAMED_IAM',

  /** Acknowledge your stack contains one or more macros */
  AUTO_EXPAND = 'CAPABILITY_AUTO_EXPAND',
}