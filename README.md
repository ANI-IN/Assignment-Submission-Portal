# Assignment Portal

This is a backend system for an assignment submission portal where users can upload assignments, and admins can accept or reject them.

## Features:
- User registration and login.
- Admin registration and login.
- Assignment upload by users.
- Assignment review by admins (accept/reject).

## Technologies Used:
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT (JSON Web Tokens)
- Bcrypt.js

## Prerequisites:
- Node.js and npm installed.
- MongoDB Atlas or local MongoDB instance.
- A `.env` file with the following variables:
```bash
  MONGO_URI=<your MongoDB URI>
  JWT_SECRET=<your JWT secret>
  ```
## Setup Instructions:
1. Clone the repository:

```bash
git clone https://github.com/ANI-IN/Assignment-Submission-Portal.git
cd Assignment-Submission-Portal
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file: Create a .env file in the root directory and add the following:
```bash
MONGO_URI=<your MongoDB URI>
JWT_SECRET=<your JWT secret>
```

4. Start the server:
```bash
nodemon app.js
```

5. Access the API: The server will run on 
```bash
http://localhost:3000 
```
You can use Postman to test the following endpoints:
```bash
POST /api/users/register - Register a user.
POST /api/users/login - Login as a user.
POST /api/admins/register - Register an admin.
POST /api/admins/login - Login as an admin.
POST /api/users/upload - Upload an assignment (user).
GET /api/admins/assignments - Get assignments (admin).
```
