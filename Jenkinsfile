@Library('pipeline-github-plugin')_

pipeline {
    agent any

    triggers {
         issueCommentTrigger('.*/test.*')
        }

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
}