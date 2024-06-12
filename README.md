# Advanced Todo Application

Welcome to the Advanced Todo Application! This project is a React application developed with TypeScript that allows users to manage their tasks efficiently. It supports CRUD operations on tasks, login/logout functionality, and drag-and-drop functionality to move tasks between different statuses.

## Features

- CRUD Operations on Tasks: Create, read, update, and delete tasks.
- Authorization Functionality: User authentication to securely access the application.
- Drag and Drop: Easily move tasks from 'Todo' to 'Complete' status.

## Installation


### Front-end
Follow these steps to install and set up the frontend of the Advanced Todo Application:


- Clone the repository and navigate to the frontend directory:
```bash
  git clone https://github.com/DodiTank16/advanced-todo-application.git
  cd my-project
```

- Installing dependencies and start the frontend application:
```bash
  npm install
  npm start
```

### Back-end

Follow these steps to install and set up the backend of the Advanced Todo Application:


- Navigate to the backend directory (if not already there) and install dependencies:
```bash
  cd ../server
  npm install

```

- Installing dependencies and start the frontend application:
```bash
  npm install
  npm start
```

- Set up environment variables:
 > Create a .env file in the backend directory and add the necessary environment variables (e.g., database connection string, JWT secret).
```bash
  DATABASE_URL=your_database_url
  JWT_SECRET=your_jwt_secret
```


- Start the backend server:
```bash
  npm start
```




## Usage

Here's how you can use the Advanced Todo Application:

###  1. Authorization:
- Upon launching the application, you'll be prompted to log in.
- If you don't have an account, you can sign up.
- Use the login form to access your tasks.

###  1. CRUD Operations:
- Create: Add new tasks using the 'Add Task' button.
- Read: View your tasks listed under 'Todo' and 'Complete'.
- Update: Click on a task to edit its details.
- Delete: Remove tasks using the delete button associated with each task.

###  1. Drag and Drop:
- Drag tasks from the 'Todo' list and drop them into the 'Complete' list to mark them as completed.
## Contact

For questions or feedback, please contact me at tankdodi@gmail.com

