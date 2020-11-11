import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const vpc = new aws.ec2.Vpc('VPCTPA', { cidrBlock: '10.0.0.0/16', enableDnsHostnames: true });

export const vpcId = vpc.id; 