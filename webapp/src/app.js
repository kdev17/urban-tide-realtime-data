var express = require('express');
var app = express();
const axios = require('axios');
const Socket = require('blockchain.info/Socket');
var request = require('request');

let mySocket = null;
const endpoint = 'http://elasticsearch3:9200/transactions/transaction/';
let initialIndex = 0;


const closeSocket = function(){
  if(mySocket){ 
    mySocket.close();
  }
}

const saveData = function (id, objJson) {
  axios.post(endpoint + id, objJson)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

app.get('/', function (req, res) {
  request({
    uri: endpoint + '_search',
  }).pipe(res);
});

app.get('/transaction', function (req, res) {
  request({
    uri: endpoint + req.query.idT 
  }).pipe(res);
});

app.get('/num_element_transaction', function (req, res) {
  request({
    uri: endpoint + '_count',
  }).pipe(res);
});

app.get('/sub', function (req, res) {
  
  closeSocket();
  mySocket = new Socket();
  mySocket.onTransaction(function (value) {
    saveData(initialIndex, value);
    initialIndex++;
  });
  res.send({'msg': 'subscription done'});
});

app.get('/unsub', function (req, res) {
  closeSocket();
  res.send({'msg': 'Unsubscription done'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

