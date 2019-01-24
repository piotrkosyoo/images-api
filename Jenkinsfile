pipeline {
    agent any

     stages {
         stage('Build') {
             steps {
               sh "go sdfsdfversion"
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
