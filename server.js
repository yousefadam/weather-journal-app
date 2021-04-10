// Setup empty JS object to act as endpoint for all routes
projectData = {};



// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Get Route
app.get("/getWeather", (req, res)=>{
    res.send(projectData);
})

//POST Route
app.post("/addWeather", (req, res)=>{
    console.log(req.body);
    projectData.push(req.body);
    res.send(req.body);
})


// Setup Server
port = 3000;

const server = app.listen(port, listening);

function listening() {
    console.log(`server running on localhost: ${port}`);
}



