/*
	Serial Modem to transport serial data from a /dev mount point to a tcp/ip resource
*/

//----- libraries ------- //
// use http library to send data to an API endpoint 
var http = require("http");

// ---- configuration ---file based.. blocks.. ---- //
// create collecter endpoint from ./config/enpoint.json file
 var endpoints = JSON.parse(fs.readFileSync("./config/endpoint.json"));

var req = http.request(endpoints.collector-endpoint, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();