pipeline {

    agent any

    stages {

        stage('Frontend Install') {

            steps {

                dir('frontend') {

                    sh 'npm install'
                }
            }
        }

        stage('Frontend Build') {

            steps {

                dir('frontend') {

                    sh 'npm run build'
                }
            }
        }

        stage('Backend Install') {

            steps {

                dir('backend') {

                    sh 'npm install'
                }
            }
        }

        stage('Docker Build') {

            steps {

                sh 'docker compose build'
            }
        }

        stage('Docker Run') {

            steps {

                sh 'docker compose up -d'
            }
        }
    }

    post {

        success {

            echo 'CI/CD Pipeline Successful'
        }

        failure {

            echo 'Pipeline Failed'
        }
    }
}
