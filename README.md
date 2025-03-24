Devtinder Backend
Welcome to the Devtinder Backend repository! Devtinder is a platform designed to help developers connect with each other, similar to a dating platform but for developers. Developers can create profiles, showcase their skills, connect with others, and more. This repository contains the backend API for Devtinder, built with Node.js and MongoDB.

Table of Contents
Installation

API Documentation

User Authentication

User Profile

Connections

Skills

Technologies

License

Installation
To get started with the Devtinder Backend, clone the repository and install dependencies.

1. Clone the repository

 git clone https://github.com/Samanvith20/DEVTINDER.git
cd devtinder-backend
2. Install dependencies

npm install
3. Set up environment variables
Create a .env file in the root of the project and add the following variables:

bash

MONGO_URI=mongodb://localhost:27017/devtinder
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI: MongoDB connection URI.

PORT: The port to run the backend server.

JWT_SECRET: A secret key used to sign and verify JWT tokens.

4. Start the server
bash
Copy
npm start
The backend will run on http://localhost:3000 by default.
