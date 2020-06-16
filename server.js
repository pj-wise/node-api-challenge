const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api', apiRoutes);

server.get('/', (req, res) => {
    res.send('The api is working');
});

module.exports = server;