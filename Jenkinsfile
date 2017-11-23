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

                sh 'mv app/src/test-report.xml backend/src/test-report-front.xml'
                junit '**/backend/src/test-report*.xml'
            }
        }

        node('staging') {
            stage('Set up staging environment') {
                unstash 'fullstack'
                cleanOldBuild()
                sh 'docker-compose -f docker-compose-debug.yml up -d'
            }
        }

        node {
            notify("Deploy to production?")
            slackSend channel: '#jenkins', color: 'good', message: "Would you like to deploy ${env.JOB_NAME} build nr ${env.BUILD_NUMBER} to production?", teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
        }

        node('prod') {
            stage ('Deploy') {
                unstash 'fullStack'
                cleanOldBuild()
                sh 'docker-compose -f docker-compose-prod.yml up -d'
                slackSend channel: '#jenkins', color: 'good', message: "Successfully built a new version of ${env.JOB_NAME} build nr ${env.BUILD_NUMBER}", teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
            }
        }


    } catch (err) {
        slackSend channel: '#jenkins', color: 'bad', message: 'Nooo, something broke :(', teamDomain: '2dv612ht17', token: "${env.SLACK_TOKEN}"
        currentBuild.result = 'FAILURE'
    }

}

def cleanOldBuild() {
    sh 'docker-compose stop'
    sh 'docker-compose rm -f'
    sh 'docker network prune -f'
}
