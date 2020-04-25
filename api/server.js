const express = require("express");

const server = express();

server.use(express.json());

const accounts = require('../accountsRouter.js')

server.use('/api/accounts', accounts)

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda</h>
    `);
});

module.exports = server;
