pipeline {

    agent any

    environment {

        COMPOSE_PROJECT_NAME = "xplore-project"
    }

    stages {

        stage('Verify Docker') {

            steps {

                sh 'docker --version'
                sh 'docker compose version'
            }
        }

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

        stage('Docker Cleanup') {

            steps {

                sh '''
                docker compose down || true

                docker rm -f mongodb || true

                docker rm -f xplore-task-manager-backend-1 || true

                docker rm -f xplore-task-manager-frontend-1 || true

                docker system prune -f || true
                '''
            }
        }

        stage('Docker Build') {

            steps {

                sh 'docker compose build'
            }
        }

        stage('Docker Deploy') {

            steps {

                sh 'docker compose up -d'
            }
        }

        stage('Verify Containers') {

            steps {

                sh 'docker ps'
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

        always {

            sh 'docker ps -a'
        }
    }
}
