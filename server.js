require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under here

// test
app.get('/api/test', (req, res) => {
  const message = "success";
  console.log(message);
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
