def scmVars;
def commitHash

pipeline {

     agent any

     stages {

        stage('init') {
             steps {
                checkout scm
             }
        }

        stage('Prepare') {
             steps {
               // if go env is GOPATH="/var/lib/jenkins/go" then just create temp data on path and later remove app will be in workspace bin folder
               sh "mkdir /var/lib/jenkins/go/src/images-api"
               sh "cp -r * /var/lib/jenkins/go/src/images-api"
               sh "go env"
               sh "go version"
             }
        }

        stage('Build') {
              steps {
                 sh "go build -v -work  -o ./bin/images-api-app code/main.go"
              }
        }

        stage('Clean') {
              steps {
                 sh "rm -r /var/lib/jenkins/go/src/images-api"
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
