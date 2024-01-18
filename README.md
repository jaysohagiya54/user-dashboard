## User Dashboard App

**Overview**

This User Dashboard App is a web application built with React.js and designed for managing user accounts. The app provides various functionalities, including creating a new user, updating existing user information, viewing user details, and fetching a paginated list of all users.

**Features**

    1. Create User
Create a new user by providing a username, email, and role. The app validates the email format before adding the user to the system.

    2. Update User
Edit and update user information, including the username, email, and role. Ensure that the email format is valid.

    3. User Detailed Page
View detailed information about a specific user by navigating to the user's dedicated page.

    4. Fetch All Users
Retrieve a paginated list of all users. The app displays a limited number of users per page, allowing for easy navigation.

    5. Pagination
The user list is paginated, displaying a specified number of users per page. Navigation controls enable users to move between pages easily.

**Created By**


 Jay Sohagiya - CMT

**Technologies Used**

React.js ,

React Router for navigation ,

Pagination for efficient user list viewing

**Getting Started**

  Clone the repository:

 ```Copy code
    git clone https://github.com/jaysohagiya54/user-dashboard.git
    
  Install dependencies:


  ```Copy code
   cd user-dashboard-app
  npm install
  Start the application:

bash
Copy code
npm start
The app will be available at http://localhost:3000.

Usage

Navigate to the "Create User" page to add a new user.
Click on a user's name in the user list to view detailed information on a separate page.
Use the "Edit" button on the user detail page to update user information.
Browse through the paginated user list with navigation controls.


#Folder Structure

user-dashboard-app/
|-- public/
|   |-- index.html
|-- src/
|   |-- components/
|   |   |-- CreateUserForm.js
|   |   |-- UserDetails.js
|   |   |-- UserList.js
|   |-- App.js
|   |-- index.js
|-- package.json
|-- README.md

Additional Notes
Customize the API endpoints in the app to connect to your backend for data storage and retrieval.
Implement server-side pagination if dealing with a large number of users.
Feel free to explore and enhance the User Dashboard App according to your specific requirements and preferences.






