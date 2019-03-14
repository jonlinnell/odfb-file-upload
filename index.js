require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const { get } = require('./helpers/api');

const tokenRoute = require('./routes/token');
const uploadRoute = require('./routes/upload');

const { PORT, UPLOAD_TARGET } = process.env;

if (!UPLOAD_TARGET) {
  throw new Error('UPLOAD_TARGET is not defined in .env.');
}

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: { fileSize: 4 * 1024 * 1024 },
  })
);
app.use(cors({ origin: 'http://localhost:1234' }));

app.use('/token', tokenRoute);
app.use('/upload', uploadRoute);

app.get('/me', (req, res) => {
  get('/me')
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.send(error.toString());
    });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
