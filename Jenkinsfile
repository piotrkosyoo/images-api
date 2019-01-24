pipeline {
    agent any

     stages {
         stage('version') {
             steps {
               sh "go version"
               }
         }

         stage('build') {
              steps {
                sh "go build -o build/images-api"
               }
         }
      }

     post {
          failure {
             step([$class: 'GitHubIssueNotifier',
                 issueAppend: true,
                 issueLabel: '',
                 issueTitle: '$JOB_NAME $BUILD_DISPLAY_NAME failed'])
              }
     }
 }
