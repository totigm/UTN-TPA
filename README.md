# UTN-TPA

Every time a push is made to this repository, a Pulumi project runs by a CircleCI pipeline.

The Pulumi project creates a docker image based on a Dockerfile and uploads it to an AWS ECR repository. Once the image has been pushed successfully, Pulumi creates an ECS cluster and register a Fargate service based on the already pushed image.
