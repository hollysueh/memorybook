# Memory Book - A MERN Application
**Memory Book** is a full-stack web application created using React, Express, Node, MongoDB and Cloudinary.
Memory Book is an app which allows users to create a customizable virtual photo album. Users are able to upload images to their album, edit page content, add/delete pages, and share a link to their album with friends & family.
This app is part of HyperionDev's "Full-Stack Web Development" course and is their final Capstone Project.

## Getting Started
#### Dependencies
The following packages were used to create this app:
**Express**:
1. Cloudinary (https://www.npmjs.com/package/cloudinary)
1. Cookie-Parser (https://www.npmjs.com/package/cookie-parser)
1. dotenv - for .env files (https://www.npmjs.com/package/dotenv)
1. Json Web Token - for user authorization (https://www.npmjs.com/package/jsonwebtoken)
1. Request - for HTTP calls (https://www.npmjs.com/package/request)
1. Helmet - for security (https://www.npmjs.com/package/helmet)
1. Mocha and Chai - for testing
1. Mongoose
1. Nodemon

**React**:
1. Create React App
1. React Bootstrap Validation
1. React-Router-DOM (https://reactrouter.com/web/guides/quick-start)
1. js-cookie (https://www.npmjs.com/package/js-cookie)
1. React Pageflip - for photo album effect (https://www.npmjs.com/package/react-pageflip)
1. React-Test-Renderer - for testing

#### Installation
##### Local Computer
Copy the file 'L3T15-Capstone Project.zip' to your local computer. Double-click on the zip file to decompress it.
Once decompressed, first open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-server' folder. In the window, type "npm install" and wait for the files to install.
Next, open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-client' folder. In the window, type "npm install" and wait for the files to install.

##### GitHub
To install the app files, follow the link https://github.com/hollysueh/memorybook. On the left hand side there will be a green button labelled "Code". Click on this button, and from the dropdown menu click "Download zip. The zip file will then start automatically downloading to your computer.

Once the zip file has finished downloading, open it by double-clicking on the file.
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-server' folder. In the window, type "npm install" and wait for the files to install.
Repeat the above steps in the 'memorybook-client' folder.

## Usage
### Heroku
Visit the following link to use the app online: https://my-memory-book.herokuapp.com/

### Local PC
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-server' folder. In the window, type "npm start", which will start the app's server on port 8080.
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-client' folder. In the window, type "npm start", which will load the app in your browser on any available port.

## App Instructions
### Login / Create Account
Navigate to the app's home page. In the top-right corner of the header, there will be an option to Login / Create Account. If you're a new user, click Create Account. Enter your details into the form, and click the 'Create Account' button. Your account will have been successfully created and you can now start creating your Memory Book!

To Login, click the 'Login' link in the top-right corner to be redirected to the Login page. Enter your details into the Login form, and click the 'Login' button. You will then be redirected to your Memory Book which you can start editing your photo album!

### Creating a Memory Book
Once you've created an account, use the Dropdown menu on the top-left of the screen to select 'My Memory Book'. You will then be redirected to your personal photo album where you can create, edit and delete your Memory Book.
- To add a new page, click 'Add Page' at the bottom of the screen.
- To add a new photo, click on the 'Upload Photo' button on the page. From there you can upload photos from your local drive.
- To change a page header or a photo's description, click on the text and type in your text.
- Save any changes by clicking the 'Save Page' button at the bottom of the page.
- To cancel your changes so far, click the 'Cancel Changes' button at the bottom of the page.
- To delete a page, click 'Delete Page' at the bottom of the page you want to delete.
- To navigate between pages, click 'Previous Page' or 'Next Page'.

### Share your Memory Book 
To share your Memory Book, first use the Dropdown menu on the top-left of the screen and click 'My Memory Book'. Copy the link at the top of the page, which is the unique URL to your Memory Book. You can then send this URL to friends & family to view your Memory Book.

### More Information
To find out more about this app, navigate to the 'About' or 'FAQs' page by using the Dropdown Menu in the top-left corner of the screen.

If you have any questions, you can use the 'Contact Us' page to send an email to the app creator.

## Testing
#### Express
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-server' folder. In the window, type "npm test", which will run Mocha and Chai tests on the the app's Express server.

#### React
Open a Terminal window (for Mac) or Command Prompt window (for Windows) in the 'memorybook-client' folder. In the window, type "npm start", which will run snapshot tests on React app.

## App Security
The Express package 'Helmet' has been used as a security feature for this app.
The MongoDB Atlas URL has been hidden in an .env file.
The Cloudinary name, key and secret have been hidden in an .env file.
The JWT 'secret' has been hidden in an .env file.

## Credits
**Author: Holly Henaghan**

## Software Requirements
### System Architecture
#### Web Stack
This app was be built using the **MERN** stack for web development. Express and Node.js were used to buld the server, Create React App was used to build the client, MongoDB Atlas was be used for the database and Cloudinary was used to store images.

#### Deployment
This app will be deployed via **Heroku**.

#### Front-End Tools
The front-end of this app was built using **Create React App**. This is primarily due to the creator's experience with Create React App over Next.js, however is also due to this being a 'gated application'. As the app will be mainly used by reoccuring, authenticated users; client side rendering will be more suitable.
Reference [here] (https://medium.com/frontend-digest/whats-the-difference-between-nextjs-and-create-react-app-11b55650a612#:~:text=While%20CRA%20is%20a%20tool,to%20create%20performant%20web%20applications).

#### App Styling
This app was styled using a combination of CSS, React-Bootstrap, and React-Router-Dom.

### System Requirements
#### About
This app will allow users to create a virtual photo album. Users can upload their own photos, add descriptions for each photo, and create headings on each photo page. Users are able to increase their photo album size by adding more pages.
A user must create an account to be able to create and modify a photo album. They are able to share a view-only version of their photo album with friends and family by sending them the link to their album.
This app is intended for non-commercial use only.

The benefits of using this app is that the user can create a virtual photo album which is accessible anywhere and easily shared with others. Unlike other virtual photo album applications, this app and all its features will be completely free. 

#### User Stories
- New user creates an account -
  * The actor enters login information to create a new account. The server saves the new actor’s login information on the database so it can be verified upon future logins, and tasks can be saved under the same account.
- Existing user adds a photo -
 * The actor adds a new photo to the page. The new photo is saved in the database along with the actor’s account reference, so it is retrievable by the actor.
- Existing user replaces a photo -
 * The actor replaces an existing photo on the page with a new photo. The system sends the deleted photo information and new photo information to the server along with the actor’s account information. The photo is replaced in the database.
- Existing user adds a new page to photo album -
 * The actor adds a new page to their photo album. The system creates a new page with a pre-defined template consisting of a text-box for headings, space to upload photos, and a text-box for photo descriptions.
- Allow users to share photo album with non-users -
 * The actor can send other non-users a link to view their photo album. Non-users are able to open the link and have view-only access to view the actor’s photo album.

#### Functional Requirements
- Save new user login information
- Authenticate existing user’s when logging in
- Retrieve existing user’s data (photos, text descriptions, page layouts)
- Save new photos and descriptions created by users
- Allow user to modify existing photos and text descriptions
- Allow user to delete existing photos and text descriptions
- Allow users to share photo album with non-users, allow them view only access

#### Non-Functional Requirements
##### Usability:
- The app should be intuitive and easy to use.
- The app’s name should be clearly displayed on the home page.
- The login menu should be clearly displayed on the app’s home page.
- The app should have a dropdown menu for users to navigate to different pages.
- The app should have an ‘About’ page and ‘FAQs’ page, which should include help on how to get started.
- The app should allow users to add headlines, photos and text descriptions to each photo album page. 
- The app should allow users to modify/delete headlines, photos and text descriptions to each photo album page.
- The app should allow users to add new pages to their photo album.
- The app should allow users to share their photo album via a link as view-only.

##### Reliability:
- When a user enters incorrect login details, a message “Error: incorrect
username or password. If you are a new user, create a new account” should be
displayed on the page. The server will send error status 403.
- If a user’s JWT token fails to authenticate, a message “Error: failed to verify.
Please log in again” should be displayed on the page. The server will send error
status 401.
- When a user’s photos and text descriptions are being fetched from the database, a message “Loading”
will be displayed on the page.
- When a user’s data fails to be fetched from the database, a message “Error:
Unable to load photo album” should be displayed on the page. The server will send error status 500. 
- When a user’s new photos or text fails to be added to the database, a message “Error: Unable to add new content” should be displayed on the page. The server will send error status 500.
- When a user’s existing photos or text fails to be modified in the database, a message “Error: Unable to modify content” should be displayed on the page. The server will send error status 500.
- When a user’s existing photos or text fails to be deleted from the database, a message “Error: Unable to delete content” should be displayed on the page. The server will send error status 500.
- If a user navigates to a non-existent page, or the server fails to load an app page, a message “Error 404: page not found” should be displayed on page. The server will send error status 404.
- If the app loses internet connection, a message “Error: no internet connection” will be displayed on page.

##### Performance:
- App should be able to handle multiple users viewing the photo album concurrently.
- Only one user will have admin preferences and be able to modify the photo album.
- App should be able to retrieve, save, modify, delete photos, headlines and text with a short response
time.

##### Security:
- User’s login details must be stored securely in the database server.
- User login will generate a JWT authentication token, which does not contain
sensitive information such as user password.
- Server (Express) will be protected using Helmet middleware.

### Wireframes
Included in the root L15-Capstone Project folder.