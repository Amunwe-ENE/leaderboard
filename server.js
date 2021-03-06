'use strict';
//require express
const express = require('express');
const bodyParser = require('body-parser'); // require body-parser
require('dotenv').config()

global.appRoot = __dirname;

const app = express();
//  parse JSON-encoded bodies and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('build'))
// Constants
const PORT = process.env.PORT || 8080;
//const HOST = '0.0.0.0';
//const base = '/api'

const routes = require('./server/routes');
routes(app);

//app.listen(PORT, HOST);
app.listen(PORT)
//console.log(`Running on http://${HOST}:${PORT}`);
console.log(`Running on port:${PORT}`);