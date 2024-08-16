# Task Management System - Backend

## **Project Overview**

This is the backend of the Task Management System, which serves as the server-side application responsible for handling requests from the frontend, processing data, and managing the PostgreSQL database. The backend is built using Node.js and Express, providing RESTful APIs for various task management operations.

## **Purpose and Functionality**

The backend provides secure and efficient RESTful APIs to perform CRUD operations on tasks, manage user authentication, and handle business logic. It ensures data integrity and security, enabling users to manage their tasks through the frontend interface.

## **Technology Stack**

- **Node.js:** JavaScript runtime used to build the server-side application.
- **Express.js:** Web framework for Node.js to create the API endpoints.
- **PostgreSQL:** Relational database used to store user and task data.
- **bcrypt:** Library for hashing passwords securely.
- **Sequelize:** ORM (Object-Relational Mapping) tool for interacting with the PostgreSQL database.

## **API Documentation**

### **Base URL**

The base URL for all API endpoints is:

**http://localhost:3000/api/v1**


### **Endpoints**

1. **User Registration**

   - **Endpoint:** `/users/register`
   - **Method:** `POST`
   - **Request Format:**
     ```json
     {
       "username": "user123",
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response Format:**
     ```json
     {
       "message": "User registered successfully",
       "userId": 1
     }
     ```

2. **User Login**

   - **Endpoint:** `/users/login`
   - **Method:** `POST`
   - **Request Format:**
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response Format:**
     ```json
     {
       "message": "Login successful",
       "token": "JWT_TOKEN"
     }
     ```

3. **Create Task**

   - **Endpoint:** `/users/:user_id/tasks`
   - **Method:** `POST`
   - **Request Format:**
     ```json
     {
       "title": "New Task",
       "description": "Task details",
       "priority": "High",
       "deadline": "2024-08-15"
     }
     ```
   - **Response Format:**
     ```json
     {
       "message": "Task created successfully",
       "taskId": 1
     }
     ```

4. **Get All Tasks**

   - **Endpoint:** `/users/:user_id/tasks`
   - **Method:** `GET`
   - **Response Format:**
     ```json
     [
       {
         "id": 1,
         "title": "New Task",
         "description": "Task details",
         "priority": "High",
         "deadline": "2024-08-15"
       },
       ...
     ]
     ```

5. **Update Task**

   - **Endpoint:** `/users/:user_id/tasks/:task_id`
   - **Method:** `PUT`
   - **Request Format:**
     ```json
     {
       "title": "Updated Task Title",
       "description": "Updated task details",
       "priority": "Medium",
       "deadline": "2024-08-20"
     }
     ```
   - **Response Format:**
     ```json
     {
       "message": "Task updated successfully"
     }
     ```

6. **Delete Task**

   - **Endpoint:** `/users/:user_id/tasks/:task_id`
   - **Method:** `DELETE`
   - **Response Format:**
     ```json
     {
       "message": "Task deleted successfully"
     }
     ```

7.  **Project Management**

#### `GET /users/:user_id/projects`
- **Purpose**: Retrieves all project names for the logged-in user.
- **Request**:
  - Parameters:
    - `user_id`: ID of the user.
- **Response**:
  - Success: 
    ```json
    [
      {
        "project_id": "integer",
        "project_name": "string"
      }
    ]
    ```
  - Error: 
    ```json
    {
      "error": "Error message."
    }
    ```
## **How to Run the Backend**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/zparshah/task-management.git
    ```
2. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**
   - Create a `.env` file in the root of the `backend` directory and add the following:
     ```
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=task_management
     JWT_SECRET=your_jwt_secret
     ```
5. **Run database migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```
6. **Start the server:**
    ```bash
    npm start
    ```

7. **Access the APIs:**
   The server will run on `http://localhost:3000` by default. You can use tools like Postman or cURL to test the API endpoints.

## **Directory Structure**

```plaintext
backend/
│
├── config/
│   └── config.json         # Database configuration
├── controllers/
│   └── users.js   # login and registration logic
│   └── taskController.js   # Task management logic
├── models/
│   └── user.js             # User model
│   └── task.js             # Task model
├── routes/
│   └── users.js            # Users login and registration routes
│   └── taskRoutes.js       # Task management routes
├── migrations/             # Sequelize migrations
├── seeders/                # Sequelize seeders
├── .env                    # Environment variables
└── server.js               # Main server file

