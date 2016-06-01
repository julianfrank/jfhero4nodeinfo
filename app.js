'use strict'

//Imports
var http = require('http')
var capInventory = JSON.parse(require('jfnodeinfo').getNodeInfo())

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
    console.log(showHrTime(process.hrtime()) + "\t: " + message)
}

log("Julian Frank's App Server with pid(" + process.pid + ") is loading")

var server = http.createServer(function (request, response) {
    var constructTime = process.hrtime();
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Julian Frank's NodeJS Environment Inventory App</title>");
    response.write("<script>(function(e,c,a,g,f){function d(){var b=c.createElement('script');b.async=!0;b.src='//radar.cedexis.com/1/21113/radar.js';c.body.appendChild(b)}
(function(){for(var b=[/\bMSIE (5|6)/i],a=b.length;a--;)if(b[a].test(navigator.userAgent))return!1;return!0})()&&('complete'!==c.readyState?(a=e[a])?a(f,d,!1):(a=e[g])&&a('on'+f,d):d())})
(window,document,'addEventListener','attachEvent','load');</script>")
    response.write("</head>");
    response.write("<body>");
    response.write("Julian Frank's NodeJS Environment Inventory App<br><br>");
    response.write("Sourcecode available on https://github.com/julianfrank/jfhero4nodeinfo<br><br>");
    response.write("You are being serviced by Worker with pid(" + process.pid + ")<br>")
    response.write("<br>request.rawHeaders : <br><pre>" + JSON.stringify(request.headers, undefined, 4) + "</pre>")

    response.write("<br>NodeJS Environment Inventory : <br>")
    response.write("<br>OS : <br><pre>" + JSON.stringify(capInventory.os, undefined, 2) + "</pre>")
    response.write("<br>V8 : <br><pre>" + JSON.stringify(capInventory.v8, undefined, 2) + "</pre>")
    response.write("<br>Process : <br><pre>" + JSON.stringify(capInventory.process, undefined, 2) + "</pre>")
    response.write("<br>Globals : <br><pre>" + JSON.stringify(capInventory.globals, undefined, 2) + "</pre>")
    response.write("<br>Module : <br><pre>" + JSON.stringify(capInventory.module, undefined, 2) + "</pre>")

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
