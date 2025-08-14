pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:rajuramkeshmpp/HealthCare_UI.git',
                    credentialsId: 'git-key'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'CI=false npm run build' // Bypass ESLint warnings
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                sudo cp -r build/* /var/www/html/
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

