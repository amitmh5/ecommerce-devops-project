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
       stage('Docker Build') {
            steps {
                dir('backend') {
                    sh 'docker build -t backend:v1 .'
                }
            }
        }

    }
}
