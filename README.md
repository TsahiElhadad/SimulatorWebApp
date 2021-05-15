# SimulatorWebApp

RESTful API Web based HTTP protocol App using MVC Architecture.

## Description

The application provides the user an interface through which he can upload 2 CSV files (Learn file & Detect file). <br/>
When the upload complete, the user can choose between 2 algorithms that will detect potential anomalies. <br/>

## More on the implementation process

As described above, the application provides the user an interface through which he can upload 2 CSV files:
* Learn file - with this CSV file, the app can identify what is proper flight (by the data and anomalies) 
* Detect file - the app will determine if the uploaded CSV file present a proper flight & identify anomalies (if exists)

After the user upload those 2 files, he can choose which algorithm to use:
* Hybrid algorithm
* Regression algorithm 

After clicking the 'send' button, the server will run the choosen algorithm, and will display the anomalies (if exists) to the user, by the foramt: <br/>
Description | Time Step 
-----|-------
` ` | ` `


## Tech/framework used

**Built with**
* Visual Studio Code

*Based on JavaScript, React & HTML*

**Features and tools:**
* MVC architecture
* Architectural and design pattern
* Communication and Client-Server Architecture


## Compile and run
To download and set up 'SimulatorWebApp' application, follow these steps:
1. Download 'SimulatorWebApp' app from GitHub
2. Import the project in Visual Studio Code (for example) 
4. `node server.js` to run the server
5. Enter `http://localhost:8080/` to open the web application
6. Enjoy!

<p align="center">
  <img src="View/Resources/Main.jpeg" width = "600" /> 
</p>
 
