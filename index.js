"use strict";
var express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const fs = require('fs')

var app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/', function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<html> <h2>Welcome to POC !!! </h2></html>');
    response.end();
});

app.post('/login', (request, response) => {
    debugger;
    console.log(`request from  UI ::${JSON.stringify(request.body)}`);

    let objDat = request.body;
    console.log(objDat);
    //let userName = request.body.username;
    //let userPass = request.body.password;
    //let userPin = request.body.pin;    

    if (objDat.username === "poc" && objDat.password === "poc" && objDat.pin === "123") {
        response.status(200).send({ 'status': 's', 'message': 'logged in successfully !!' });
    } else {
        response.status(400).send({ 'status': 'e', 'message': 'username or password does not match' });
    }
});

// data list 

app.get('/DataList', (request, response) => {    
    debugger;
    const dataList = getDataList();
    response.send(dataList);
});

// Individual data 

app.get('/DataSelect/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const dataList = getDataList();
    const indivData = dataList.filter(s => s.id === id);
    if (indivData.length > 0)
        response.send(indivData[0]);
    else
        response.send("no data");
});

// add data
app.post('/add', (request, response) => {
    debugger;
    let objDat = request.body;
    console.log(objDat);
    //let userName = request.body.username;
    //let userPass = request.body.password;
    //let userPin = request.body.pin;
    //objDat.id = "2";
    const dataList = getDataList();
    objDat.id = dataList.length + 1;
    dataList.push(objDat);
    saveData(dataList);

    if (objDat.username === objDat.password) {
        response.status(200).send({ 'status': 's', 'message': 'logged in successfully !!' });
    } else {
        response.status(400).send({ 'status': 'e', 'message': 'username or password does not match' });
    }
});

// Update Data
app.patch('/DataUpdate/:id', (request, response) => {
    
    const id = parseInt(request.params.id);    
    const objData = request.body;

    let dataList = getDataList();
    
    let objIndiv = dataList.filter(s => s.id === id);
    if (!objIndiv.length > 0) {
        return response.status(409).send({ error: true, msg: 'data not exist' });
    }
    dataList = dataList.map(function (objItem) {
        if (objItem.id === id) {
            objItem = objData;
        }
        return objItem;
        //a.price = a.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    });

    //filter the userdata
    //console.log(objIndiv);
    //console.log(objData);
    //objIndiv[0] = objData;
    //const updateUser = existUsers.filter(user => user.username !== username)
    //push the updated data
    //updateUser.push(userData)
    //finally save it
    console.log(dataList);
    saveData(dataList);
    response.send({ success: true, msg: 'Data updated successfully' });
})

// Delete Data
app.delete('/DataDelete/:id', (request, response) => {
    const id = parseInt(request.params.id);
    
    const dataList = getDataList();

    //filter the userdata to remove it
    const filterData = dataList.filter(s => s.id !== id);
    console.log(filterData);
    if (dataList.length === filterData.length) {
        return response.status(409).send({ error: true, msg: 'Data does not exist' });
    }
    //save the filtered data
    saveData(filterData);
    response.send({ success: true, msg: 'User removed successfully' });

})


// Data service

const getDataList = () => {
    const jsonData = fs.readFileSync('LocalDB.json');
    return JSON.parse(jsonData);
}

const saveData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('LocalDB.json', stringifyData);
}



app.listen(process.env.PORT || 5050, () => {
    console.log('server is running on port 5050..');
});