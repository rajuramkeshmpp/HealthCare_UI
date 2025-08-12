pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'jenkins-ec2-key', url: 'git@github.com:rajuramkeshmpp/HealthCare_UI.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                // Prevent lint warnings from failing the build
                sh 'CI=false npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['jenkins-ec2-key']) {
                    sh """
                        scp -o StrictHostKeyChecking=no -r build/* ubuntu@54.196.222.218:/var/www/html/
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful."
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}

