pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                sh 'go version'
            }
        }
    }

    post {
       failure {
            script {

                   pullRequest.addLabel('Build Failed')

            }
       }

        success {
            script {
                pullRequest.addLabel('Build success')
             }
        }
    }
 }
