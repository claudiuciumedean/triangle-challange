# triangle-challenge

# Description
An application built in JavaScript, which outputs the triangle type based on its side lengths.

In order to solve the triangle challange, I chose to implement the server and the "business rules" in Node.js, and the client was built in ES6. In addition to this, the application's simple UI was built by using Tradeshift's UI components.

# Solution
The program was developed by using the Separation of Concerns design principle, as a consequence the program is divided in components. This was done in order to ensure scalability and an easier maintenance of the project.
Furthemore, modern JavaScript features such as async/await, fetch and Promises were used as they provide an simple alternative for executing, composing and managing asynchronous operations.

For the validation of the user input, on the client side, form submission with values that are not integers is prevented. 
In addition to this, if the user submits the form, the data is checked again in order to make sure that the client side code has not been altered and other values but integers were submitted. Moreover, the server validation also consists of checking if the triangle sides respect the "Triangle Inequality" theorem.
If the triangle is valid, the server responds with a JSON containing a custom status code, used for displaying custom notifications, and the triangle type.

# Setting up the project
1. Clone the repository, navigate to project's root folder and run "npm install".
2. Run "npm run dev" or "npm run build"
3. The application is running on http://localhost:8080
