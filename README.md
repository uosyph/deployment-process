<a name="readme-top"></a>

<h1 align="center">
  AWS Deployment Process
</h1>

<p align="center">
  Udacity NANODEGREE Program - ( Third Project )
<br>
  Deploying a Full Stack Application to AWS
<br>
  Using Elastic Beanstalk for The Backend, S3 for The Frontend, RDS for The Database
<br>
  and CircleCI for The Continuous Integration & Delivery
<br>
  - By : Yousef Saeed - 
</p>

---

## Architecture

<img src="documentation/diagrams/AWS_Architecture.png" alt="Architecture Diagram">

Read More About Infrastructure of AWS Architecture: [Infrastructure Description](documentation/InfrastructureDescription.md)


### Frontend

`Endpoint: http://random-yousef-bucket.s3-website-us-east-1.amazonaws.com/`

<img src="documentation/images/eb_env.png" alt="AWS Elastic Beanstalk">

### Backend

`Endpoint: http://app-env.eba-bsgdyj6c.us-east-1.elasticbeanstalk.com/`

<img src="documentation/images/s3_bucket.png" alt="AWS S3">

### Database

`Endpoint: database-1.ca4icwlfv2pp.us-east-1.rds.amazonaws.com`

<img src="documentation/images/rds_db.png" alt="AWS RDS">

### CircleCI
![CircleCIStat](https://circleci.com/gh/yousafesaeed/deployment-process.svg?style=svg)

<img src="documentation/images/circleci_app.png">

Read More About CircleCI and Pipeline Process: [Pipeline Process](documentation/PipelineProcess.md)


## Built With

* [![AWS][aws.shield]][aws-url]
* [![CircleCI][circleci.shield]][circleci-url]


<p align="right">(<a href="#readme-top">Back to Top</a>)</p>


[aws.shield]: https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white
[aws-url]: https://aws.amazon.com/

[circleci.shield]: https://img.shields.io/badge/circleci-343434?style=for-the-badge&logo=circleci&logoColor=white
[circleci-url]: https://circleci.com/

