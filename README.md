# ChatRoom
This is a test of the Socket.IO API for my capstone project.
It's a chatroom implemented in JavaScript that allows users to connect to a server and send messages to eachother.
The plan is to add all of the needed functionality that would be required in a 'whiteboarding' note-taking application.
So far the requirements for the app are:
- Login and logout capabilities
- Send messages to server
- Recieve messages from server
- Update UI according to server messages
##Server
Index.js contains the code which acts as the server. It creates an instance of a server through the Socket.IO API and listens
on port 3000 at localhost. From there any user who would access `http://localhost:3000/` will recieve the index.html file which
contains the code for the client side of the chatroom.
