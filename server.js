require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());


//Connect to postgres
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


// Put all API endpoints under here

// test
app.get('/api/all-notes', (req, resp) => {
  client.connect();
  client.query('SELECT * FROM notes;', (err, res) => {
  let messages = res.rows;
    if (err) throw err;

    resp.json({messages});
    client.end();
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
