"use strict";
var express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
var app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/', function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<html> <h2>Welcome to POC !!! </h2></html>');
    response.end();
});

app.post('/login', (request, response) => {

    console.log(`request from  UI ::${JSON.stringify(request.body)}`);

    let userName = request.body.username;
    let userPass = request.body.pass;
    if (userName === userPass) {
        response.status(200).send({ 'message': 'logged in successfully !!' });
    } else {
        response.status(400).send({ 'message': 'username or password does not match' });
    }
});

app.listen(process.env.PORT || 5050, () => {
    console.log('server is running on port 5050..');
});