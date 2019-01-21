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
            success {
                githubNotify description: 'This is a shorted example',  status: 'SUCCESS'
            }

            failure {
               githubNotify description: 'This is a shorted example',  status: 'FAILURE'
            }
        }
 }
