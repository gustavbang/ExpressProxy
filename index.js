var path = require("path");
var rp = require("request-promise");
var express = require("express");
var app = express();
var port = 8000;

var server = "52.58.159.100";


function getToken (username, password) {
  return new Promise(function(resolve, reject) {
    console.log(username)
    console.log(password)
    var options = {
      method: "POST",
      uri: `https://${server}:27200/openApi/login`,
      form: {
        userName: username,
        password: password
      },
      headers: {},
      insecure: true,
      rejectUnauthorized: false
    };

    rp(options)
      .then(function(body) {
        console.log("sending body")
        return body
      })
      .catch(function(err) {
        console.log("rejected")
        reject(err);
      });
  });
};

app.use(require("body-parser").json());

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile("public/index.html");
});

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post("/express_backend", function(req, res) {
  getToken(req.body.userName, req.body.password)
      .then(body => {
        res.send(body);
      })
      .catch(err => res.send(err));
});

app.post("/getToken", function(req, res) {
  getToken({ ...req.body })
    .then(body => {
      res.send(body);
    })
    .catch(err => res.send(err));
});

app.listen(port, () => console.log(`App listening on port: ${port}!`));
