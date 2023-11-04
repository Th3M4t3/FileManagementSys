# FileManagementSys
The FS class application provides a simplified interface to a file system, enabling users to store and retrieve content using hash-based storage for efficient space utilization.
To download the project open a terminal and the the following commands:
```
git clone https://github.com/Th3M4t3/FileManagementSys.git
cd FileManagementSys 
```
After downloading the project to your local machine you will have to install the dependecies of the project.
To install all necessary dependencies run the following command:
```
npm install 
```
This command will generate a `node_modules` directory.
To build the project run:
```
npm run build
```
This command will generate a `index.js` file inside the `dist` directory.
Finaly to run the code just run the following command:
```
npm start
```
The output of the test inside the code should appear in the terminal.

## Devops
Write a short description of how would you deploy your solution in a cloud environment (AWS, Azure, GCP). What type of resources would you use and why?

To begin with, I would develop a user-friendly UI interface, enabling users to easily navigate and interact with the file management system. For smaller projects, the integration of a CI/CD pipeline might not be necessary due to the scale. However, for larger scale projects, implementing a CI/CD pipeline, such as Jenkins or Gitlab CI/CD, becomes very useful. These pipelines help developers build, test, and deploy applications. I would containerize my application using Docker. This enables the application to function reliably in any environment. Given the small scale of this file management application, a lightweight compute resource like an AWS EC2 is sufficient. For an effective file management system, there is a need for a storage solution. There are many options available, like Amazon S3 for AWS, Azure Blob Storage for Azure, and Cloud Storage for GCP. Finally, I would deploy the application on the selected compute resource, making it accessible to users. For larger-scale applications, I would add additional steps when deploying an application to the cloud. Steps such as implementing robust authentication system, monitoring solutions, and testing processes.
