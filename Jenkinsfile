pipeline {
    agent any

    environment {
        EC2_IP = "54.83.74.16"            // Your EC2 Public IP
        SSH_KEY_ID = "git-hub-key"        // Jenkins SSH key credential ID for EC2
        REPO = "git@github.com:rajuramkeshmpp/HealthCare_UI.git"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${REPO}", credentialsId: 'git-hub-key'
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
                sshagent (credentials: [SSH_KEY_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} 'rm -rf ~/healthcare-ui/*'
                    scp -o StrictHostKeyChecking=no -r build/* ubuntu@${EC2_IP}:~/healthcare-ui/
                    ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} 'nohup serve -s ~/healthcare-ui -l 3000 >/dev/null 2>&1 &'
                    """
                }
            }
        }
    }
}
