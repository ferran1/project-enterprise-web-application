# Installation guide
### Step 1: Installing the necessary software
Before cloning the respository we need to install some software first. 
It is required to install the Node Package Manager also known as **NPM**.

NPM can be installed from the official Node.js web site: [https://nodejs.org](https://nodejs.org)

After installing NPM you need to install the **Angular CLI**. Open your terminal on your device and execute the following line.

    > npm install -g @angular/cli

### Step 2: Clowning the project
Clone the project: https://github.com/ferran1/Project-EWA.git

### Step 3: Running the application

If everything went succesful, you now have the Angular CLI installed globally on your computer. Now, navigate via the terminal to the project directory. Execute the following command (this command will run the Angular application):

    > ng serve

Now we will install the necessary to run the Spring Boot application. One of the neccesary dependencies to run the Spring is to install **Java** on your computer. You can get Java from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
The other dependency that is required is Maven and can be installed [here](https://maven.apache.org/install.html) or you can use the integrated Maven of your IDE.

If everything went succesfully until this point, you are ready to start the Spring Boot application. You can start the Spring application by running the ***main*** thread in the
*ServerApplication* class.

#### To run the front-end unit tests: 
1. Make sure you have the angular CLI installed(See step 1 of the installation guide)
2. Open a commandline tool(e.g. CMD, Powershell, git bash)
3. Change the working directory to the location of the angular application(e.g. cd cd C:/projects/project-ewa/my-app/)
4. Type 'ng test' in the commandline and press enter

#### To run the back-end unit tests: 
1. make sure Java version 11 or above is installed

##### Intellij
2. Open the server map as a intellij project
3. Make sure the maven pom.xml dependencies are installed
4. Expand the file structure until src>test>java is visible
5. Right click on the Java folder and click 'run all tests'

##### Commandline
2. Open a commandline tool(e.g. CMD, Powershell, git bash)
3. Change the working directory to the location of the spring application(e.g. cd cd C:/projects/project-ewa/server/)
4. When using CMD or Powershell Type '.\mvnw test' in the commandline and press enter

