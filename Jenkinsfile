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

               sh '''
                  GOPATH=$(pwd)
                  cd src
                  go go build -v -work
                  '''

                //sh "go build -v -work -o images-api src/main.go"
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
