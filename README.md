# 2dv612-team3-project

* ```git clone https://github.com/tommykronstal/2dv612-team3-project.git```
* ```cd 2dv612-team3-project && docker-compose up --build```
  * Only build one `dep docker-compose up -d --no-deps --build backend`
* Frontend served by nginx: [http://localhost:5000](http://localhost:5000)
* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:4000](http://localhost:4000)

# Live server and CI/CD

* Live server: [http://194.47.174.40](http://194.47.174.40)
* Staging server frontend served by nginx: [http://194.47.174.56:5000](http://194.47.174.56:5000)
  * Staging server frontend: [http://194.47.174.56:3000](http://194.47.174.56:3000)
  * Staging server backend: [http://194.47.174.56:4000](http://194.47.174.56:4000)
* Jenkins build server: [http://194.47.174.37:8080](http://194.47.174.37:8080)

# Users on live/prod
  ### System admin
  * admin@admin.nu    admin

  ### Company admin
  * admin@fox.nu password
  
  ### Company rep
  * rep@fox.nu		password

  ### Users
  * hillclimber@user.com		password
  
  ### Ctegories
  * bikes

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
