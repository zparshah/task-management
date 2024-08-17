# Task Management System - Frontend

## **Project Overview**

This is the frontend of the Task Management System, a web-based application that allows users to manage their tasks efficiently. The frontend provides an intuitive user interface where users can register, log in, create, update, delete, and search for tasks. The design is focused on ease of use and responsiveness, ensuring a smooth user experience across different devices.

## **Features**

- **User Authentication:** Users can register, log in, and manage their session securely.
- **Task Management:** Users can create, edit, and delete tasks, with tasks displayed in a categorized list.
- **Task Search:** Users can search for tasks by title or content, making it easy to find specific tasks.
- **Task Sorting:** Tasks can be sorted based on priority or deadline.
- **Responsive Design:** The UI is fully responsive, ensuring compatibility across devices.
## **Technology Stack**

- **HTML/CSS:** For the structure and styling of the web pages.
- **JavaScript:** For implementing dynamic behavior and interaction on the web pages.
- **Bootstrap:** For responsive design and prebuilt UI components.
- **Axios:** For making HTTP requests to the backend APIs.

## **How to Run the Frontend**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/zparshah/task-management.git
    ```
2. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
3. **Open `index.html` in your browser:**
    You can open the `index.html` file directly in your browser to run the application. Ensure that your backend server is running so that the frontend can communicate with it.

4. **Run a local development server (optional):**
    For a more streamlined development experience, you can use tools like `live-server` or `http-server`.
    ```bash
    npm install -g live-server
    live-server
    ```

5. **Ensure the backend server is running:**
    The frontend relies on a backend API server for full functionality, so ensure that the backend is up and running.

## **Directory Structure**

```plaintext
frontend/
│
├── index.html          # Main entry point for the application
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── main.js         # Main JavaScript logic
│   └── tasks.js        # Task management logic
└── assets/
    └── images/         # Images used in the application
