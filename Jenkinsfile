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
                    sh 'mvn clean package -DskipTests'
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

        stage('Backend Docker Build') {
            steps {
                dir('backend') {
                    sh '''
                    docker build -t backend:${BUILD_NUMBER} .
                    '''
                }
            }
        }

        stage('Frontend Docker Build') {
            steps {
                dir('frontend') {
                    sh '''
                    docker build -t frontend:${BUILD_NUMBER} .
                    '''
                }
            }
        }

        stage('Backend Trivy Scan') {
            steps {
                sh '''
                export TMPDIR=/opt/trivy-temp
                trivy image --scanners vuln backend:${BUILD_NUMBER}
                '''
            }
        }

        stage('Frontend Trivy Scan') {
            steps {
                sh '''
                export TMPDIR=/opt/trivy-temp
                trivy image --scanners vuln frontend:${BUILD_NUMBER}
                '''
            }
        }

        stage('Backend Push To ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr-creds'
                ]]) {

                    sh '''
                    aws ecr get-login-password --region ap-south-1 | \
                    docker login --username AWS --password-stdin \
                    886181574480.dkr.ecr.ap-south-1.amazonaws.com

                    docker tag backend:${BUILD_NUMBER} \
                    886181574480.dkr.ecr.ap-south-1.amazonaws.com/backend:${BUILD_NUMBER}

                    docker push \
                    886181574480.dkr.ecr.ap-south-1.amazonaws.com/backend:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Frontend Push To ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr-creds'
                ]]) {

                    sh '''
                    aws ecr get-login-password --region ap-south-1 | \
                    docker login --username AWS --password-stdin \
                    886181574480.dkr.ecr.ap-south-1.amazonaws.com

                    docker tag frontend:${BUILD_NUMBER} \
                    886181574480.dkr.ecr.ap-south-1.amazonaws.com/frontend:${BUILD_NUMBER}

                    docker push \
                    886181574480.dkr.ecr.ap-south-1.amazonaws.com/frontend:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy Backend To Kubernetes') {
            steps {
                sh """
                kubectl set image deployment/backend \
                backend=886181574480.dkr.ecr.ap-south-1.amazonaws.com/backend:${BUILD_NUMBER} \
                -n ecommerce

                kubectl rollout status deployment/backend -n ecommerce
                """
            }
        }

        stage('Deploy Frontend To Kubernetes') {
            steps {
                sh """
                kubectl set image deployment/frontend \
                frontend=886181574480.dkr.ecr.ap-south-1.amazonaws.com/frontend:${BUILD_NUMBER} \
                -n ecommerce

                kubectl rollout status deployment/frontend -n ecommerce
                """
            }
        }
    }
}
