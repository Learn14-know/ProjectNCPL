pipeline {
    agent any

    environment {
        ACR_NAME = "jenkinsacr12345"           // e.g., myacr.azurecr.io
        DOCKER_IMAGE = "${ACR_NAME}/nodejs-app"
        DOCKER_TAG = "latest"
        SONARQUBE_ENV = "MySonarQube"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/Learn14-know/ProjectNCPL.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                trivy image --exit-code 0 --severity HIGH,CRITICAL $DOCKER_IMAGE:$DOCKER_TAG
                trivy image --exit-code 1 --severity CRITICAL $DOCKER_IMAGE:$DOCKER_

