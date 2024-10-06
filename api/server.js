const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const PORT = 8125;

// Middleware
app.use(bodyParser.json());

// start server

const server = http.createServer(app);

function startServer () {
    server.listen(PORT, () => {
        console.log('Server started at port: ' + PORT);
    });
}

// API Routes
const apiRoutes = require('./routes/quizRoutes');

app.use('/api/',apiRoutes);

startServer();
  