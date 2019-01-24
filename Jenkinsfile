pipeline {
     agent any


     stages {
         stage('version') {
             steps {
               sh "go version"
               sh "go env"
               sh "mkdir -p /var/lib/jenkins/go/src/images-api"
               sh "ln -s {$WORKSPACE} /var/lib/jenkins/go/src/images-api"
             }
         }

         stage('build') {
              steps {
                 sh "go build -v -o ./bin/images-api"
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
