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
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockmember:${IMAGE_TAG} back/member/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockmember:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Build and Push Docker Image for News') {
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstocknews:${IMAGE_TAG} back/news/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstocknews:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Build and Push Docker Image for Newsscrap') {
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstocknewsscrap:${IMAGE_TAG} back/newsscrap/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstocknewsscrap:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Build and Push Docker Image for Stock') {
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockstock:${IMAGE_TAG} back/stock/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockstock:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Build and Push Docker Image for Frontend') {
//             when {
//                 expression { env.MEMBER_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockfrontend:${IMAGE_TAG} front/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockfrontend:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Build and Push Docker Image for Auth') {
//             when {
//                 expression { env.NEWS_CHANGED == 'true' }
//             }
            steps {
                script {
                    sh """
                        docker build -t ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockauth:${IMAGE_TAG} back/auth/
                        docker push ocir.ap-singapore-2.oci.oraclecloud.com/axzbwuphhddr/newstockauth:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Member') {
            steps {
                script {
                    def deploymentPath = 'k8s/backend/deployment-member.yaml'  // deploymentPath 정의
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f ${deploymentPath}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for News') {
            steps {
                script {
                    def deploymentPath = 'k8s/backend/deployment-news.yaml'  // deploymentPath 정의
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f ${deploymentPath}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Newsscrap') {
            steps {
                script {
                    def deploymentPath = 'k8s/backend/deployment-newsscrap.yaml'  // deploymentPath 정의
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f ${deploymentPath}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Stock') {
            steps {
                script {
                    def deploymentPath = 'k8s/backend/deployment-stock.yaml'  // deploymentPath 정의
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f ${deploymentPath}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Frontend') {
            steps {
                script {
                    def deploymentPath = 'k8s/frontend/deployment-front.yaml'  // deploymentPath 정의
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f ${deploymentPath}
                    """
                }
            }
        }

        stage('Update Kubernetes Deployment for Auth') {
//             when {
//                 expression { env.MEMBER_CHANGED == 'true' }
//             }
            steps {
                script {
                    def deploymentPath = 'k8s/backend/deployment-auth.yaml'  // deploymentPath 정의
                    sh """
                        sed -i 's/TAG_PLACEHOLDER/${IMAGE_TAG}/g' ${deploymentPath}
                        kubectl --server=$OKE_MASTER --token=$OKE_TOKEN --insecure-skip-tls-verify apply -f ${deploymentPath}
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
                mattermostSend(color: 'good',
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/x91hu5m9gfy9mbp8ns8n1m5xqw',
                channel: 'newstock-jenkins')
            }
        }
        failure {
            script {
                withEnv(["LANG=en_US.UTF-8"]) {
                    def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                    mattermostSend(color: 'danger',
                    message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/x91hu5m9gfy9mbp8ns8n1m5xqw',
                    channel: 'newstock-jenkins')
                }
            }
        }
    }


}


