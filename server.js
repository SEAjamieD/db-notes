require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


//Connect to postgres
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

// Put all API endpoints under here

// test
app.get('/api/test', (req, res) => {
  let message = "keep trying";

  client.query('SELECT * FROM notes;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));

    }
    client.end();
  });

  res.json(message);

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
