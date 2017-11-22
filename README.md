# 2dv612-team3-project

* ```git clone https://github.com/tommykronstal/2dv612-team3-project.git```
* ```cd 2dv612-team3-project && docker-compose up --build```
  * Only build one `dep docker-compose up -d --no-deps --build backend`
* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:4000](http://localhost:4000)

# Live server and CI/CD

Latest news on live deployment. If you do a push to master, Jenkins will make a build and post to a Slack channel about the result before deploying it to a server. Still in experiment phase, but you are free to join. Service may be down from time to time.

* Join Slack workspace with Jenkins updates. Jenkins will post in #jenkins: [Join Slack workspace here](https://join.slack.com/t/2dv612ht17/shared_invite/enQtMjcwNzMzMzE2MzA1LWViMjgxZmU0ZDRmNjc3YzFiMjI5NTJmMjRhODE5NTZkNTllN2Y0ZmIyODA2YTdmMzJiYTFhODkxMDU3ZmMxMDY)
* Live server: [http://146.185.168.160:3000/](http://146.185.168.160:3000/)


# run locally

* make sure you have run npm install from backend dir to install dependencies locally
* if you are running frontend also npm install in app directory
* use node version 9.2.0 (checkout nvm if you have a different version installed)
* nodemon needs to be installed globally; sudo npm install nodemon -g
* have mongodb installed locally and start the mongo daemon with command mongod
* then npm start in the backend directory and the app should boot

To use debugger in webstorm when running locally:
* select edit configurations top right, press +, select node. 
* Ensure that working directory is 
* set to your/path/to/2dv612-team3-project and that the node interpreter is set to using node 8.9.1
* Javscript file to backend/index.js . 