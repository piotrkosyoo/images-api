def scmVars;
def commitHash

def deployToDev = false

pipeline {

     agent any

     tools {
        nodejs "node"
     }

     stages {

        stage('Init') {
             steps {
                checkout scm
             }
        }

        stage('Prepare') {
             steps {
               // if go env is GOPATH="/var/lib/jenkins/go" then just create temp data on path and later remove app will be in workspace bin folder
               sh "rm -rf /var/lib/jenkins/go/src/images-api"
               sh "mkdir /var/lib/jenkins/go/src/images-api"
               sh "cp -r * /var/lib/jenkins/go/src/images-api"
               sh "go env"
               sh "go version"
             }
        }

        stage('Build UI') {

              steps {

                 script {
                    dir("client-api") {
                        sh "npm -v"
                        sh "node -v"
                        // UI build in code to slow on AWS
                        //sh "npm install"
                        //sh "npm run build"
                    }
                 }
              }
        }

        stage('Build backend') {

              steps {
                 sh "go get github.com/lucasb-eyer/go-colorful"
                 sh "go build -v -work  -o ./bin/images-api-app main/main.go"
              }
        }

        stage('Clean') {

              steps {
                 sh "rm -rf /var/lib/jenkins/go/src/images-api"
              }
        }


        stage('Deploy to dev') {

            agent none

            steps {

                script {

                    try {
                        timeout(time: 200, unit: 'SECONDS') {
                            deployToDev = input(
                                            id: 'Proceed1', message: 'Do you want deploy  to dev ?', parameters: [
                                            [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this']])
                        }
                    } catch(err) {
                        deployToDev = false
                    }
                }
            }
        }

        stage('Deploy') {

            when {
                expression { deployToDev != false}
            }

            steps {
                sh "sh docker-restart-containers.sh"
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
