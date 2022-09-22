# Pipeline Process

The CircleCI pipeline associated with this project is automatically triggered when a developer pushes code to the main branch in the GitHub repo. This document will explain this process.

## Local Machine

A developer makes changes locally in the main branch. They commit the code and push it to GitHub.

## GitHub

The main branch is updated with the latest commit. Since the GitHub project is linked to the CircleCI pipeline, the pipeline is automatically triggered.

## CircleCI

The pipeline is automatically triggered and begins to run.

### Build Stage

The pipeline builds the different application components by executing the following steps:

* Install the front-end dependencies
* Install the back-end dependencies
* Build the front-end application
* Build the back-end application

<img src="images/circleci_build.png" alt="CircleCI Build Stage">

### Hold Stage

The pipeline enters a holding stage that requires manual approval before it can proceed with the deployment to AWS.

### Deploy Stage

Deploys the application components to the appropriate AWS resources.

* Front-end code deployed to AWS Simple Storage Service (S3)
* Back-end code deployed to AWS Elastic Beanstalk (EB)

<img src="images/circleci_deploy.png" alt="CircleCI Deploy Stage">

### Storing Environment Variables

Sensitive information should not be hard-coded in the application, so it is stored in CircleCI.

<img src="images/circleci_env_vars.png" alt="Storing Environment Variables">

---

![CircleCIStat](https://circleci.com/gh/yousafesaeed/deployment-process.svg?style=svg)

<img src="images/circleci_app.png" alt="CircleCI">

## Pipeline Process Diagram

Below is a diagram of the pipeline process starting with the developer's local commit.

<img src="diagrams/Pipeline.png" alt="Pipeline Process Diagram">

