def AWS_SECRET_ACCESS_KEY =""

pipeline {

    agent any

       environment {
           AWS_SECRET_ACCESS_KEY = credentials('github-new-cred')
       }
       stages {
           stage('Example stage 1') {
               steps {
                  sh """AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}  echo AWS_SECRET_ACCESS_KEY"""
               }
           }
           stage('Example stage 2') {
               steps {
                 sh "echo aa"
                 sh "echo  AWS_SECRET_ACCESS_KEY"
               }
           }
       }


 }
