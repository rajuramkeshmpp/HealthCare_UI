pipeline {
    agent any

    environment {
        // Define necessary paths
        BUILD_DIR = "build"  // React build directory
        DEPLOY_DIR = "/var/www/your-app"  // EC2 target directory to deploy the build
        EC2_USER = "ubuntu"  // EC2 username (update if necessary)
        EC2_IP = "54.196.222.218"  // Your EC2 public IP
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Clone the GitHub repository using SSH
                    git 'git@github.com:rajuramkeshmpp/HealthCare_UI.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install necessary Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    // Run the build process for the React app
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Use Jenkins credentials to securely access the EC2 instance via SSH and deploy the build
                    withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ec2-key', keyFileVariable: 'EC2_PRIVATE_KEY')]) {
                        sh """
                        # Deploy build to EC2 using SCP (Secure Copy Protocol)
                        scp -i ${EC2_PRIVATE_KEY} -r ${BUILD_DIR} ${EC2_USER}@${EC2_IP}:${DEPLOY_DIR}
                        """
                    }
                }
            }
        }

        stage('Clean Workspace') {
            steps {
                script {
                    // Clean up workspace after the deployment is complete
                    cleanWs()
                }
            }
        }
    }

    post {
        always {
            // This block will run regardless of success or failure
            echo "Build and Deployment process completed."
        }
        success {
            // Success actions, such as notifying or logging
            echo "Deployment successful!"
        }
        failure {
            // Failure actions, such as notifying about the failure
            echo "Deployment failed. Check the logs for errors."
        }
    }
}
