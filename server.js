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
//use connection pooling so that can run multiple times
const { Pool, Client } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})


// Put all API endpoints under here

// callback - checkout a client
app.get('/api/all-notes', (req, resp) => {
  //use connection pooling so that can run multiple times
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM notes;', (err, res) => {
      done()

      let messages = res.rows;
      if (err) {
        console.log(err.stack)
      } else {
        console.log("********************")
        resp.json({messages})
      }
    })
  })
})

app.get('/api/notes/:id', (req, resp) => {

  pool.connect((err, client, done) => {
    if (err) throw err
    client.query(`SELECT * FROM notes WHERE id=${query.params.id};`, (err, res) => {
      done()
      console.log(res);
      // let messages = res.rows;
      if (err) {
        console.log(err.stack)
      } else {
        console.log("Single Row ********************")
        // resp.json({message})
      }
    })
  })

})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
