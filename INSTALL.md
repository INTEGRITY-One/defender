#Installing Defender

##Option A: Using The Defender Docker Hub Repo
If you would like to use our Docker repo, it is available in our [Docker Hub repo](https://registry.hub.docker.com/u/sferrell/defender/). This repo will setup an Ubuntu-based Docker container that has the Defender source files cloned into /Development/defender/src.
- Install Defender Docker image
```
$ docker run -i -t --name defender sferrell/defender:final bash
cd Development/defender/src
```
- Start Mongo Service
```
mongod
```
- Start Defender with Grunt
```
grunt serve -f
```
You can now access the Defender app from http://localhost:80

##Option B: Full Installation
###Pre-Requisites
Note that for some Linux environments, you may need to install with sudo and place the -g flag at the end of the command.
- [Install Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) and the npm package manager. There is a [Github Gist](https://gist.github.com/isaacs/579814) if you encounter issues installing Node.js
- [Install and Start MongoDB](http://docs.mongodb.org/manual/installation/) and ensure it is running on port 27017.
- [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) so that you can get our app.
- Install [Bower Package Manager](http://bower.io/) with the following command:
```
$ npm install -g bower
```
- Install [Grunt Task Runner](http://gruntjs.com/) with the following command:
```
$ npm install -g grunt-cli
```

###Ensure the following firewall ports are open
- 35729 (LiveReload)
- 22 (SSH)
- 9000 (Node App)

###Clone git source code
```
$ git clone https://github.com/INTEGRITY-One/defender.git defender
```
This will clone the Defender repo and store it in a defender folder.

###Install Defender App
After completing all pre-requisites, you're ready to install the application. This process will download all dependencies and build the application.

cd to the defender\src directory and use the following command:
```
$ npm install
```
Build the application with grunt
```
$ grunt build
```

###Start Defender Application
cd to the defender\src directory and use the following command:
```
$ grunt serve
```

###Testing The Defender Application
cd to the defender/src directory and use the following command:
```
$ grunt test
```
