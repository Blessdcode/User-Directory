### SETUP DOCUMENTATION

This document provide an over view of how this project is setup. Ranging from several functions created and their use case.

### `About the project`

The project is a User Directory where users are stored either users fetched or users added locally. This was done with React framework for the user interface and tailwind css for styling. Also made use of (https://randomuser.me/api/?results=10) to fetch use via fetch Api and display each users in a grid display. With a search bar that helps search or filters user by either name or email. Made sure it is responsive across large screens and small screens.

### Helpers Functions

-- **`getSavedUsers`**: This helps to save fetch users data to and local users data to localstorage. <br/>
-- **`removeFromStorage`**: This remove user from localstorage base on the UUID <br/>
-- **`getSavedUsers`**: This is use to get user that are stored in localstorage <br/>
-- **`readFileAsDataURL`**: This is to convert an image into url that can be read or display by the HTML image tag. <br/>

### userDirectory

This handler most part of the functionality, which include fetching users from api, filtered users, and some components are display here.

### userCollection

User collection displays fetched user that are pass via props from user directory component and its in display in grid for good ui experience.

### Toolbar

This helps with the search functionality to filter users base on the input enter either name or email.

### addUserForm

A dedicated form fild that take in user details (name, email, phone, picture) and validate the input before sending to localstorage.

### Header

More like the nav bar to display logo and also icon that trigger the addUserForm for user validations

### Dependencies

`Vite`: Setting up react  <br/>
`Tailwind`: For styling component and creating good UI  <br/>
`React Icons`: For icons  <br/>

### Note

The api was not included in dotenv file rather use directly in the fetch request, some you don't have to input your when you want to run this app since the api is very available for everyone.

### Frontend Intern Assessment

--**`Objective`**  <br/>

Build a mini web application that showcases a User Directory. This will test your ability to work with
a frontend framework, consume APIs, and deploy a simple app. <br/>

--**`Requirements`**  <br/>

• Project Setup: Use React or Vue.js. Organize your code into components. <br/>
• User Interface: Fetch users from the Random User API  <br/>
(https://randomuser.me/api/?results=10). Display users in a list/grid with: Name, Email, Profile
photo. Include a search bar to filter users by name or email. Ensure responsiveness.
• User Interaction: Add a form to manually add a new user (name + email + upload/select profile  <br/>
photo). New users should appear in the directory. Include basic validation.
• Data Management: Keep added users in local storage so they persist after refresh.  <br/>
• Styling: Use plain CSS or a framework (Tailwind/Bootstrap). Keep it clean and consistent.  <br/>
• Deployment: Deploy the project to Netlify or Vercel. Share both the GitHub repo and live URL.  <br/>

--**`Deliverables`**  <br/>

• GitHub repository with code.  <br/>
• README file with setup instructions, features overview, and live deployment link.  <br/>
Evaluation Criteria
• Functionality: Meets requirements.  <br/>
• UI/UX: Responsive, user-friendly.  <br/>
• Code Quality: Structured, clean, readable. <br/>
• Problem Solving: Handling of requirements and edge cases.  <br/>
• Deployment: Working live demo.  <br/>
