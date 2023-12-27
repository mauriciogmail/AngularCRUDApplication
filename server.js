const express = require('express');
const app = express();

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 4201;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

var bodyparser = require('body-parser');
var oracledb = require('oracledb');

let clientOpts = {};
if (process.platform === 'win32') {
  // Windows
  // If you use backslashes in the libDir string, you will
  // need to double them.
  clientOpts = { libDir: 'C:\\oracle\\instantclient_19_21' };
} else if (process.platform === 'darwin' && process.arch === 'x64') {
  // macOS Intel
  clientOpts = { libDir: process.env.HOME + '/Downloads/instantclient_19_8' };
}
// else on other platforms like Linux the system library search path MUST always be
// set before Node.js is started, for example with ldconfig or LD_LIBRARY_PATH.

// enable node-oracledb Thick mode
oracledb.initOracleClient(clientOpts);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

var connAttrs = {
  "user" : "IPM",
  "password" : "5917",
  "connectString" : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=LAPTOP-R9T36UC4)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=XE)))"
}

    // Http Method: GET
    // URI        : /ejemplo
    app.get('/ejemplo', function (req, res) {
      "use strict";
      oracledb.getConnection(connAttrs, function (err, connection) {
          if (err) {
              // Error connecting to DB
              res.set('Content-Type', 'application/json');
              res.status(500).send(JSON.stringify({
                  status: 500,
                  message: "Error connecting to DB",
                  detailed_message: err.message
              }));
              return;
          }



          connection.execute("SELECT * FROM PRODUCTOS", {}, {
              outFormat: oracledb.OBJECT // Return the result as Object
          }, function (err, result) {
              if (err) {
                  res.set('Content-Type', 'application/json');
                  res.status(500).send(JSON.stringify({
                      status: 500,
                      message: "Error getting the user profile",
                      detailed_message: err.message
                  }));
              } else {
                  //log first row... THIS WORKS !
                  console.log(result.rows[0]);

                  res.header('Access-Control-Allow-Origin','*');
                  res.header('Access-Control-Allow-Headers','*');
                  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                  res.contentType('application/json').status(200);
                  res.send(JSON.stringify(result.rows));
              }
              // Release the connection
              connection.release(
                  function (err) {
                      if (err) {
                          console.error(err.message);
                      } else {
                          console.log("GET /sendTablespace: Connection released");
                      }
                  });
          });
      });
  });
