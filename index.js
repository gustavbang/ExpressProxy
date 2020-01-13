var path = require("path");
var rp = require("request-promise");
var express = require("express");
var app = express();
.listen(process.env.PORT || 8000)

var server = "52.58.159.100";

app.use(require("body-parser").json());

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile("public/index.html");
});

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post("/express_backend", function(req, res) {
  var options = {
    method: "POST",
    uri: `https://${server}:27200/openApi/login`,
    form: {
      userName: req.body.userName,
      password: req.body.password
    },
    headers: {},
    insecure: true,
    rejectUnauthorized: false
  };

  rp(options)
      .then(function(body) {
        res.send(body)
      })
      .catch(err => res.send(err));
});

app.post("/realtime_data", function(req, res) {
  console.log(req.body.plantid)
  console.log(req.body.openApiroarand)
  var options = {
    method: "POST",
    uri: `https://${server}:27200/openApi/queryDeviceDetail`,
    form: {
      plantid: req.body.plantid,
      openApiroarand: req.body.openApiroarand
    },
    headers: {},
    insecure: true,
    rejectUnauthorized: false,
  }

  rp(options)
      .then(function(body) {
        res.send(body)
      })
      .catch(err => res.send(err));
});




app.listen(port, () => console.log(`App listening on port: ${port}!`));
