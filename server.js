// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('./'));

// Setup Server

const port = 8500;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
  console.log("hey i'm a server");
}

// GET Route I

app.get('/all', returnObject);

function returnObject(req, res) {
  res.send(projectData);
}

// Post Route

app.post('/add', postData);
function postData(req, res) {
  projectData = req.body;
  res.send(projectData);
  // data = {
  //   date: req.body.date,
  //   temp: req.body.temp,
  //   content: req.body.content,
  // };
  // projectData.push(data);
  // console.log(data);
}
