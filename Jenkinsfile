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
                 sh "export GOPATH=/var/lib/jenkins/workspace/images-api-pipeline"
                 sh "go env"
                 sh "go build -v -work  -o ./bin/images-api src/main.go"
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
