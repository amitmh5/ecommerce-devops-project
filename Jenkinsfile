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

    }
}
