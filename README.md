# interview-practical
interview-practical
## Project Description

This project is a full-stack web application built with Angular, Express, and MongoDB. It provides a simple user management system where users can register, log in, and logged in user can add post and view list of posts.

## Installation

To run this project, you need to have Angular(13.3.11), Node.js(16.13.0), npm(8.1.0) and mongodb(6.0.8) installed. Once you have them set up, follow these steps:

1. Clone the repository: `git clone https://github.com/vishitarathod/interview-practical.git`
2. Navigate to the project directory: `cd interview-practical`
3. Install the dependencies for the Angular frontend: `cd practical-frontend && npm install`
4. Install the dependencies for the Express backend: `cd practical-backend && npm install`

## Configuration

Before running the project, you need to configure a few settings:

1. Backend configuration:
   - Create a `.env` file in the `practical-backend` directory.

2. Add the following configuration variables in the `.env` file:
    PORT=3000
    ACCESS_SECRET_KEY=lhvbgfolwyhgfvoplwfyedoiuwyefvgoulywhedfvgo
    ACCESS_EXPIRATION_TIME=1h
    CONNECTION_STRING=mongodb://localhost:27017/demoPractical

## Usage

To start the project, follow these steps:

1. Start the Angular frontend: `cd practical-frontend && ng serve`
2. In a separate terminal, Start the Express backend: `cd practical-backend && npm start`

Once both the frontend and backend servers are running, you can access the application by navigating to `http://localhost:4200` in your browser.

## API Documentation

The API exposes the following endpoints:

- `POST /api/register`: User Register.
- `POST /api/login`: User Login.
- `POST /api/add-post`: Add post by loggedIn User.
- `GET /api/list`: View All Posts by loggedIn User.

## Credits

- Angular - [https://angular.io/](https://angular.io/)
- Express - [https://expressjs.com/](https://expressjs.com/)
- MongoDB - [https://www.mongodb.com/](https://www.mongodb.com/)