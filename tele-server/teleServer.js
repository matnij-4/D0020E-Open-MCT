var expressWs = require('express-ws');
var app = require('express')();
var path = require("path")
var bodyParser = require("body-parser");
expressWs(app);


app.use(bodyParser.urlencoded({extended: true}))


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Telecomand server on port " + PORT);
});

//Set the routes.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/html/telecommand.html"));
  });

app.post("/", function(req, res){

    var SendCommand = req.body.command;

    console.log(SendCommand);

    res.sendFile(path.join(__dirname + "/html/telecommand.html"));

});