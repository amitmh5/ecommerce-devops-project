pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code available from GitHub'
            }
        }

        stage('Build Maven') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                        mvn sonar:sonar \
                        -Dsonar.projectKey=ecommerce-backend
                        '''
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    sh 'docker build -t backend:v1 .'
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                export TMPDIR=/opt/trivy-temp
                trivy image --scanners vuln backend:v1
                '''
            }
        }

    }
}
