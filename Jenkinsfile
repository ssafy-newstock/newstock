pipeline {
    agent any
    environment {
        OCI_REGION = 'ap-singapore-2'
        OCI_REPO = 'axzbwuphhddr/test'
        IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        OKE_MASTER = 'https://140.245.55.18:6443'
        OKE_TOKEN = credentials('OKE_TOKEN')
        OCI_AUTH_TOKEN = credentials('OCI_AUTH_TOKEN')
    }
    stages {
//         stage('Check for Changes') {
//             steps {
//                 script {
//                     def changedFiles = sh(script: "git diff --name-only HEAD~1", returnStdout: true).trim().split('\n')
//                     env.MEMBER_CHANGED = changedFiles.any { it.startsWith('back/member/') } ? 'true' : 'false'
//                     env.NEWS_CHANGED = changedFiles.any { it.startsWith('back/news/') } ? 'true' : 'false'
//                     env.STOCK_CHANGED = changedFiles.any { it.startsWith('back/stock/') } ? 'true' : 'false'
//                     env.FRONT_CHANGED = changedFiles.any { it.startsWith('front/') } ? 'true' : 'false'
//                 }
//             }
//         }
        stage('Login to OCI Registry') {
            steps {
                script {
                    sh """
                        echo 'Logging in to OCI Container Registry...'
                        echo '$OCI_AUTH_TOKEN' | docker login -u axzbwuphhddr/thswltjr12@gmail.com --password-stdin ocir.ap-singapore-2.oci.oraclecloud.com
                    """
                }
            }
        }

        stage('Build and Push Docker Image for Member') {
//             when {
//                 expression { env.MEMBER_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/${imageName}:${IMAGE_TAG} back/member/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/${imageName}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Member') {
//             when {
//                 expression { env.MEMBER_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f k8s/backend/deployment-member.yaml
                    """
                }
            }
        }

        stage('Build and Push Docker Image for News') {
//             when {
//                 expression { env.NEWS_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/${imageName}:${IMAGE_TAG} back/news/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/${imageName}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for News') {
//             when {
//                 expression { env.NEWS_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f k8s/backend/deployment-news.yaml
                    """
                }
            }
        }

        stage('Build and Push Docker Image for Stock') {
//             when {
//                 expression { env.STOCK_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/${imageName}:${IMAGE_TAG} back/stock/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/${imageName}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Stock') {
//             when {
//                 expression { env.STOCK_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f k8s/backend/deployment-stock.yaml
                    """
                }
            }
        }
    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good',
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/x91hu5m9gfy9mbp8ns8n1m5xqw',
                channel: 'newstock-jenkins'
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger',
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/x91hu5m9gfy9mbp8ns8n1m5xqw',
                channel: 'newstock-jenkins'
                )
            }
        }
    }
}


