const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes/route');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(router);

const port = 4300;

app.listen(process.env.PORT || port, (err) => {
  if (err) console.log('Unable to start the server!');
  else console.log('Server started running on: ' + port);
});
