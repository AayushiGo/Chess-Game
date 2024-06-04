# Online Chess Game

An online chess game built using Node.js, Express, EJS, Socket.IO, and MongoDB. Two players can play the game in real-time.

## Features

- Real-time multiplayer chess game
- Role assignment for players (white, black, spectator)
- Move validation and turn management
- Current board state synchronization across clients

## Technologies Used

- **Node.js**: Backend server
- **Express**: Web framework for Node.js
- **EJS**: Templating engine for rendering views
- **Socket.IO**: Real-time bidirectional event-based communication
- **MongoDB**: Database for storing game states (if applicable)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/online-chess-game.git
   cd online-chess-game
Install dependencies

bash
Copy code
npm install
Set up MongoDB

Ensure you have MongoDB installed and running. Create a .env file in the root of the project with your MongoDB URI:

env
Copy code
MONGO_URI=mongodb://localhost:27017/chess-game
Start the server

bash
Copy code
npm start
The server will start on http://localhost:3000.

Usage
Visit the homepage

Open your browser and navigate to http://localhost:3000. You'll see the homepage of the chess game.

Start playing

Go to http://localhost:3000/play to start the game. The first two connections will be assigned as white and black players, respectively. Any additional connections will be assigned as spectators.

File Structure
public/: Static files (CSS, JavaScript)
views/: EJS templates
routes/: Route handlers
models/: Mongoose models (if using MongoDB for game states)
app.js: Main application file
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Node.js
Express
EJS
Socket.IO
Chess.js
Feel free to contribute, open issues, and suggest improvements!

