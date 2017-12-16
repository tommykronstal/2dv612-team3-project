def frontImage = "tommykronstal/2dv612frontend"
def backImage = "tommykronstal/2dv612backend"


node('master') {

    try {
        def frontend
        def backend

        stage('checkout') {
            checkout scm
        }

        stage ('archive') {
            stash excludes: 'data/**', includes: '*.yml, app/**, backend/**, nginx/**, *.json, yarn.lock, pact/**', name: 'fullStack'
            stash includes: 'docker-compose-prod.yml, nginx/**', name: 'production'
        }
            
        stage ('Cleaning previous build') {
            cleanOldBuild("docker-compose.yml")
        }

        stage ('Build services') {
                
            parallel buildFrontend: {
                dir('./app') {
                     frontend = docker.build("${frontImage}")
                 }
             }, buildBackend: {
                dir('./backend') {
                     backend = docker.build("${backImage}")
                 }
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
            sh 'docker-compose -f docker-compose-pact.yml up --abort-on-container-exit'
            sh 'mv app/src/test-report.xml backend/src/test-report-front.xml'
            junit "**/backend/src/test-report*.xml"
        }

    } catch (err) {
        //slackSend channel: '#jenkins', color: 'bad', message: 'Nooo, something broke :(', teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
        currentBuild.result = 'FAILURE'
    }
}

node('staging') {
    stage('Set up staging environment') {
        unstash 'fullStack'
        cleanOldBuild("docker-compose-staging.yml")
        pullImage("${frontImage}")
        pullImage("${backImage}")
        sh 'docker-compose -f docker-compose-staging.yml up -d'
    }
}

//input "Deploy to production?"

node('prod') {
    stage ('Deploy') {
        unstash 'production'
        backupUploads()
        cleanOldBuild("docker-compose-prod.yml")
        sh 'docker volume rm 2dv612pipeline_static-files --force'
        pullImage("${frontImage}")
        pullImage("${backImage}")
        sh 'docker-compose -f docker-compose-prod.yml up -d'
        restoreUploads()
        //slackSend channel: '#jenkins', color: 'good', message: "Successfully built a new version of ${env.JOB_NAME} build nr ${env.BUILD_NUMBER}", teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
    }
}


// Clean up after all environments are up (should be done by puppet/ansible)
node('master') {
    removeUnusedDockerArtifacts()
}

node('staging') {
    removeUnusedDockerArtifacts()
}

node('prod') {
    removeUnusedDockerArtifacts()
}

def cleanOldBuild(df) {
    sh "docker-compose -f ${df} down"
}

def backupUploads() {
    try {
        sh 'docker cp 2dv612pipeline_webserver_1:/var/www/src/uploads -> uploads.tar'
    } catch (e) {
        sh "echo ${e}"
    }   
}

def restoreUploads() {
    try {
        sh 'tar xvf uploads.tar'
        sh 'docker cp uploads 2dv612pipeline_webserver_1:/var/www/src'
        sh 'rm -rf uploads && rm uploads.tar'
    } catch (e) {
        sh "echo ${e}"
    }   
}

def removeUnusedDockerArtifacts() {
    sh "docker system prune --force"
}

def pullImage(image) {
    sh "docker pull ${image}"
}