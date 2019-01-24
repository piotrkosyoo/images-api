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

        stage('version') {
             steps {
               sh "mkdir /var/lib/jenkins/go/src/images-api"
               sh "cp -r * /var/lib/jenkins/go/src/images-api"
               sh "go env"
               sh "go version"
             }
        }

        stage('build') {
              steps {
                 sh "go build -v -work  -o ./bin/images-api code/main.go"
              }
        }

        stage('clean') {
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
