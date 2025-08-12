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
                // Setting CI=false here stops treating lint warnings as errors
                sh 'CI=false npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['jenkins-ec2-key']) {
                    sh """
                        scp -r build/* ubuntu@<EC2_PUBLIC_IP>:/var/www/html/
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

