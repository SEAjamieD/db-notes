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

///// GET ALL NOTES
// callback - checkout a client
app.get('/api/all-notes', (req, resp) => {
  //use connection pooling so that can run multiple times
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM notes ORDER BY updated_at DESC;', (err, res) => {
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


///// GET A SINGLE NOTE
app.get('/api/notes/:id', (req, resp) => {
  var id = req.params.id;

  pool.connect((err, client, done) => {
    console.log("fix single note for SQL injection protection")

    if (err) throw err
    client.query(`SELECT * FROM notes WHERE id=${id}`, (err, res) => {
      done()
      let message = res.rows;
      if (err) {
        console.log(err.stack)
      } else {
        console.log("Single Row ********************")
        resp.json(message)
      }
    })
  })

})

///// POST A SINGLE NOTE

app.post('/api/notes/create', (req, resp) => {
  var body = req.body.note;
  var title = body.title;
  var note = body.note;
  pool.connect((err, client, done) => {
    if (err) throw err;

    console.log(title);
    console.log(note);

    client.query(`INSERT INTO notes (title, note, created_at, updated_at, user_id)
      VALUES ('${title}', '${note}', current_timestamp, current_timestamp, 1) returning id`, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Success")
          var newlyCreatedNoteId = res.rows[0].id;
          resp.json(newlyCreatedNoteId)
        }
        done()
      })
  })
})

///// update a Note
app.put('/api/notes/edit/:id', (req, resp) => {
  var id = req.params.id;
  var body = req.body.note;
  var title = body.title;
  var note = body.note;
  pool.connect((err, client, done) => {
    if (err) throw err;

    console.log(id);
    console.log(title);
    console.log(note);

    client.query(`UPDATE notes
                  SET title = '${title}',
                      note = '${note}',
                      updated_at = current_timestamp
                 WHERE id = ${id};`, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Success")
          resp.json(res);
        }
        done()
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
