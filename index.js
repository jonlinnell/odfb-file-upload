require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');

const { get } = require('./helpers/api');

const tokenRoute = require('./routes/token');
const uploadRoute = require('./routes/upload');

const { PORT, NODE_ENV, DISABLE_HTTPS, HTTPS_KEY, HTTPS_CERT, ALLOWED_ORIGINS } = process.env;

[
  'HOST',
  'PORT',
  'UPLOAD_TARGET',
  'NODE_ENV',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'ALLOWED_ORIGINS',
].forEach(option => {
  if (Object.keys(process.env).indexOf(option) === -1) {
    throw new Error(`Missing required environment variable: ${option}.\nPlease see .env.example.`);
  }
});

if (!DISABLE_HTTPS && (!HTTPS_CERT || !HTTPS_KEY)) {
  throw new Error(
    'HTTPS is enabled, but a key and/or certificate file are not specified.\nPlease see .env.example.'
  );
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
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);
if (NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

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

if (DISABLE_HTTPS) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
} else {
  https
    .createServer(
      {
        key: fs.readFileSync(HTTPS_KEY),
        cert: fs.readFileSync(HTTPS_CERT),
      },
      app
    )
    .listen(PORT);
}
