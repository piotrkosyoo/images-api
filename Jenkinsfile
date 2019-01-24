pipeline {
     agent any


     environment {
        GOPATH = "$GOPATH"
        WORKSPACE = "$WORKSPACE"
    }

     stages {
         stage('version') {
             steps {
               sh "go version"
               sh "go env"

               sh "mkdir -p ${GOPATH}/src/images-api"
               sh "ln -s {$WORKSPACE} {$GOPATH}/src/images-api"

             }
         }

         stage('build') {
              steps {
                 sh "go build -v -o ./bin/images-api main/main.go"
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
