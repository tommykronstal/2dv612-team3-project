node {

    try {

        node('master') {
            stage('checkout') {
                checkout scm
            }

            stage ('archive') {
                stash 'fullStack'
            }

            stage ('Cleaning previous build') {
                cleanOldBuild()
            }

            stage ('Build services') {

                parallel buildFrontend: {
                    sh 'docker-compose build --no-cache app'
                }, buildBackend: {
                    sh 'docker-compose build --no-cache backend'
                },
                failFast: true
            }

            stage ('Unit tests') {

                parallel frontendTest: {
                    sh 'docker-compose -f docker-compose-test.yml up app'
                }, backendTest: {
                    sh 'docker-compose -f docker-compose-test.yml up backend'
                },
                failFast: true
                
                cleanOldBuild()
                //sh 'docker-compose -f docker-compose-pact.yml up --build --abort-on-container-exit'
                sh 'mv app/src/test-report.xml backend/src/test-report-front.xml'
                junit '**/backend/src/test-report*.xml'
            }
        }

        node('staging') {
            stage('Set up staging environment') {
                unstash 'fullStack'
                cleanOldBuild()
                sh 'docker-compose build --no-cache'
                sh 'docker-compose up -d'
            }
        }


    } catch (err) {
        slackSend channel: '#jenkins', color: 'bad', message: 'Nooo, something broke :(', teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
        currentBuild.result = 'FAILURE'
    }
}

//input "Deploy to production?"

node('prod') {
    stage ('Deploy') {
        unstash 'fullStack'
        cleanOldBuild()
        sh 'docker-compose -f docker-compose-prod.yml down'
        sh 'docker volume rm 2dv612pipeline_static-files --force'
        sh 'docker-compose -f docker-compose-prod.yml build --no-cache'
        sh 'docker-compose -f docker-compose-prod.yml up -d'
        slackSend channel: '#jenkins', color: 'good', message: "Successfully built a new version of ${env.JOB_NAME} build nr ${env.BUILD_NUMBER}", teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
    }
}

def cleanOldBuild() {
    sh 'docker-compose stop'
    sh 'docker-compose rm -f'
    sh 'docker network prune -f'
}
