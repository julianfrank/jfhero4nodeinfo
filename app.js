'use strict'

//Imports
var http = require('http')
var capInventory = require('jfnodeinfo').getNodeInfo()

//Initialisations
var logText = ""

// High Resolution Timer Function
// Move to Helper Library later
var processStartTime = process.hrtime()
function showHrTime(appStartTime) {
    var diff = process.hrtime(appStartTime);
    return (Math.round((diff[0] * 1e9 + diff[1]), 1e6)) + " nSec \t"
}

// Moving all console logs into a log function
//Move to helper later
function log(message) {
    logText = showHrTime(process.hrtime()) + "\t: " + message
    console.log(logText)
}

log("Julian Frank's App Server with pid(" + process.pid + ") is loading")

var server = http.createServer(function (request, response) {
    var constructTime = process.hrtime();
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Julian Frank's NodeJS Environment Inventory App</title>");
    response.write("</head>");
    response.write("<body>");
    response.write("Julian Frank's NodeJS Environment Inventory App<br><br>");
    response.write("You are being serviced by Worker with pid(" + process.pid + ")<br>")
    response.write("<br>request.rawHeaders : <br><pre>" + JSON.stringify(request.headers, undefined, 4) + "</pre>")

    response.write("<br>NodeJS Environment Inventory : <br>")
    response.write("<br>OS : <br><pre>" + JSON.stringify(capInventory.os, undefined, 2) + "</pre>")
    response.write("<br>V8 : <br><pre>" + JSON.stringify(capInventory.v8, undefined, 2) + "</pre>")
    response.write("<br>Process : <br><pre>" + JSON.stringify(capInventory.process, undefined, 2) + "</pre>")
    response.write("<br>Globals : <br><pre>" + JSON.stringify(capInventory.globals, undefined, 2) + "</pre>")
    //response.write("<br>Module : <br><pre>" + JSON.stringify(capInventory.module, undefined, 2) + "</pre>")

    response.write("<br>Time to execute : <br>" + showHrTime(constructTime))
    response.write("</body>");
    response.write("</html>");
    response.end();
});

//Use port 8080 when testing locally
var port = process.env.PORT || 8080
server.listen(port, function () {
    log("JF App Server is listening @" + server.address().family +
        "[" + server.address().address + "]:" + port +
        " Worker pid:" + process.pid +
        " Max Listeners:" + server.getMaxListeners())
})