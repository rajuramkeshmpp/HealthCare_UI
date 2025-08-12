pipeline {
    agent any

    environment {
        EC2_IP = 'YOUR_EC2_PUBLIC_IP'            // Replace with your EC2 public IP
        SSH_CRED = 'jenkins-ec2-key'              // Your SSH credential ID in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "✅ Code already checked out by Jenkins SCM step"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: [SSH_CRED]) {
                    sh """
                        scp -o StrictHostKeyChecking=no -r build/* ubuntu@${EC2_IP}:/var/www/html/
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

