node {

    try {

        node('master') {
            
            def frontend
            def backend

            stage('checkout') {
                checkout scm
            }

            stage ('archive') {
                stash excludes: 'data/**', includes: '*.yml, app/**, backend/**, nginx/**, *.json, yarn.lock, pact/**', name: 'fullStack'
                stash includes: 'docker-compose-production.yml', name: 'production'
            }
            
            stage ('Cleaning previous build') {
                cleanOldBuild("docker-compose.yml")
            }

            stage ('Build services') {
                

                parallel buildFrontend: {
                    //sh 'docker-compose build --no-cache app'
                    frontend = docker.build("tommykronstal/2dv612frontend")
                }, buildBackend: {
                    //sh 'docker-compose build --no-cache backend'
                    backend = docker.build("tommykronstal/2dv612backend")
                },
                failFast: true
            }
           
            stage('Upload to docker hub') {
                parallel uploadFrontend: {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        frontend.push("latest")
                    }
                }, uploadBackend: {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        backend.push("latest")
                    }
                }
            }
            
            stage ('Unit tests') {

                parallel frontendTest: {
                    sh 'docker-compose -f docker-compose-test.yml up app'
                }, backendTest: {
                    sh 'docker-compose -f docker-compose-test.yml up backend'
                },
                failFast: true
                
                cleanOldBuild("docker-compose-pact.yml")
                sh 'docker-compose -f docker-compose-pact.yml up --build --abort-on-container-exit'
                sh 'mv app/src/test-report.xml backend/src/test-report-front.xml'
                junit "**/backend/src/test-report*.xml"
            }
        }
        /*
        node('staging') {
            stage('Set up staging environment') {
                unstash 'fullStack'
                cleanOldBuild("docker-compose.yml")
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d'
            }
        }
        */

    } catch (err) {
        //slackSend channel: '#jenkins', color: 'bad', message: 'Nooo, something broke :(', teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
        currentBuild.result = 'FAILURE'
    }
}

//input "Deploy to production?"
/*
node('master') {
    stage ('Deploy') {
        unstash 'fullStack'
        backupUploads()
        cleanOldBuild("docker-compose-prod.yml")
        //sh 'docker volume rm 2dv612pipeline_static-files --force'
        //sh 'docker-compose -f docker-compose-prod.yml build --no-cache'
        sh 'docker-compose -f docker-compose-prod.yml up -d'
        restoreUploads()
        //slackSend channel: '#jenkins', color: 'good', message: "Successfully built a new version of ${env.JOB_NAME} build nr ${env.BUILD_NUMBER}", teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
    }
}
*/
// Clean up after all environments are up
node('master') {
    removeUnusedDockerArtifacts()
}

node('master') {
    removeUnusedDockerArtifacts()
}

node('master') {
    removeUnusedDockerArtifacts()
}


def cleanOldBuild(df) {
    sh "docker-compose -f ${df} down"
    //sh 'docker network prune -f'
}

def backupUploads() {
    try {
        sh 'docker cp 2dv612pipeline_webserver_1:/var/www/src/uploads -> uploads.tar'
        //Unpack and restore uploads
       
    } catch (e) {
        sh "echo ${e}"
    }   
}

def restoreUploads() {
    try {
        sh 'tar xvf uploads.tar'
        sh 'docker cp uploads 2dv612pipeline_webserver_1:/var/www/src'
        sh 'rm -rf uploads'
        sh 'rm uploads.tar'
    } catch (e) {
        sh "echo ${e}"
    }   
}

def removeUnusedDockerArtifacts() {
    sh "docker system prune"
}