pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:rajuramkeshmpp/HealthCare_UI.git',
                    credentialsId: 'git-key' // Replace with your Jenkins SSH credential ID
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                # Example deploy step - change according to your setup
                cp -r build/* /var/www/html/
                echo "Deployment completed!"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build & deployment successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}

