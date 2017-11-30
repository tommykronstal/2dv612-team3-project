node {

    try {

        node('master') {
            stage('checkout') {
                checkout scm
            }

            stage ('archive') {
                stash includes: '*.yml, /app, /backend', name: 'fullStack'
            }
            
            stage ('Cleaning previous build') {
                cleanOldBuild("docker-compose.yml")
            }

            stage ('Build services') {

                //parallel buildFrontend: {
                //    sh 'docker-compose build --no-cache app'
                //}, buildBackend: {
                //    sh 'docker-compose build --no-cache backend'
                //},
                //failFast: true
            }
            
            stage ('Unit tests') {

                //parallel frontendTest: {
                    //sh 'docker-compose -f docker-compose-test.yml up app'
                //}, backendTest: {
                //    sh 'docker-compose -f docker-compose-test.yml up backend'
                //},
                //failFast: true
                
                //cleanOldBuild("docker-compose-pact.yml")
                //sh 'docker-compose -f docker-compose-pact.yml up --build --abort-on-container-exit'
                //sh 'mv app/src/test-report.xml backend/src/test-report-front.xml'
                //junit "**/backend/src/test-report*.xml"
            }
        }

        node('staging') {
            stage('Set up staging environment') {
                unstash 'fullStack'
                //cleanOldBuild("docker-compose.yml")
                //sh 'docker-compose build --no-cache'
                //sh 'docker-compose up -d'
            }
        }


    } catch (err) {
        //slackSend channel: '#jenkins', color: 'bad', message: 'Nooo, something broke :(', teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
        currentBuild.result = 'FAILURE'
    }
}

//input "Deploy to production?"

node('prod') {
    stage ('Deploy') {
        //unstash 'fullStack'
        //cleanOldBuild("docker-compose-prod.yml")
        //sh 'docker-compose -f docker-compose-prod.yml down'
        //sh 'docker volume rm 2dv612pipeline_static-files --force'
        //sh 'docker-compose -f docker-compose-prod.yml build --no-cache'
        //sh 'docker-compose -f docker-compose-prod.yml up -d'
        //slackSend channel: '#jenkins', color: 'good', message: "Successfully built a new version of ${env.JOB_NAME} build nr ${env.BUILD_NUMBER}", teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
    }
}

def cleanOldBuild(df) {
    sh "docker-compose -f ${df} stop"
    sh 'docker network prune -f'
}
