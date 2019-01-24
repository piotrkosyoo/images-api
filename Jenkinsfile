pipeline {
     agent any
     stages {
         stage('version') {
             steps {
               sh "go version"
               sh "go env"
             }
         }

         stage('build') {
              steps {
                 sh "go build -v -o -work ./bin/images-api main/main.go"
                 //sh "go build -v -work -o images-api *.go"
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
