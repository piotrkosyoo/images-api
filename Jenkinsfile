def AWS_SECRET_ACCESS_KEY =""

pipeline {

    agent any

       environment {
           AWS_SECRET_ACCESS_KEY = credentials('github-new-cred')
       }
       stages {
           stage('Example stage 1') {
               steps {
                  sh "echo "
               }
           }
       }

        post {

               success {
        githubNotify account: 'piotrkosyoo', context: 'Final Test', credentialsId: AWS_SECRET_ACCESS_KEY,
                description: 'This is an example', repo: 'acceptance-test-harness',
                , status: 'SUCCESS', targetUrl: 'https://my-jenkins-instance.com'
               }

               failure {
                   sh "echo  AWS_SECRET_ACCESS_KEY"
               }

           }

 }
