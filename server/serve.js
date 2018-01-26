const express = require('express');
const countries = require('./countries');
const cors = require('cors');
const path = require('path');

const app = express()

const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "*"
}

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/countries/:lang', (req, res) => {
  res.send({ countries: countries[req.params.lang] });
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})
app.get('/combo', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.listen(port, () => {
  console.log("country list rest-api listening on port ", port);
})
