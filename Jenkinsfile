@Library('jenkins-shared-library')_

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
                if (env.CHANGE_ID) {
                    pullRequest.addLabel('Build Failed')
                }
            }
       }

        success {
            if (env.CHANGE_ID) {
                pullRequest.addLabel('Build success')
            }
       }
}