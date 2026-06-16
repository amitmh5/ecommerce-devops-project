pipeline {
    agent any


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
        stage('Push To ECR') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'aws-ecr-creds'
        ]]) {

            sh '''
            aws ecr get-login-password --region ap-south-1 | \
            docker login --username AWS --password-stdin \
            886181574480.dkr.ecr.ap-south-1.amazonaws.com

            docker tag backend:v1 \
            886181574480.dkr.ecr.ap-south-1.amazonaws.com/backend:v1

            docker push \
            886181574480.dkr.ecr.ap-south-1.amazonaws.com/backend:v1
            '''
        }
    }
}

    }
}
