pipeline {
     agent any


     environment {
        GOPATH_APP = "$env.GOPATH"
    }

     stages {
         stage('version') {
             steps {
               sh "go version"
               sh "go env"

               sh "mkdir -p ${GOPATH_APP}/src/images-api"
               sh "ln -s {$WORKSPACE} {GOPATH_APP}/src/images-api"

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
