// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use body parser to parse request body
app.use(bodyParser.json());

// Load comments from file
let comments = [];
fs.readFile('comments.json', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Create new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to save comment');
    } else {
      res.status(201).send('Comment saved');
    }
  });
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
