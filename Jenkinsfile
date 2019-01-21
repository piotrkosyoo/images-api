def AWS_SECRET_ACCESS_KEY =""

pipeline {

    agent any

       environment {
           AWS_SECRET_ACCESS_KEY = credentials('cc-credentialsId')
       }
       stages {
           stage('Example stage 1') {
               steps {
                   sh "echo 'Hello World' "
               }
           }
           stage('Example stage 2') {
               steps {
                 echo AWS_SECRET_ACCESS_KEY
               }
           }
       }

    post {
            success {
                githubNotify account: 'raul-arabaolaza', context: 'Final Test', credentialsId: 'raul-github',
                    description: 'This is an example', repo: 'acceptance-test-harness', sha: '0b5936eb903d439ac0c0bf84940d73128d5e9487'
                    , status: 'SUCCESS', targetUrl: 'https://my-jenkins-instance.com'
            }

            failure {
               githubNotify account: 'raul-arabaolaza', context: 'Final Test', credentialsId: 'raul-github',
                   description: 'This is an example', repo: 'acceptance-test-harness', sha: '0b5936eb903d439ac0c0bf84940d73128d5e9487'
                   , status: 'SUCCESS', targetUrl: 'https://my-jenkins-instance.com'
            }
        }
 }
