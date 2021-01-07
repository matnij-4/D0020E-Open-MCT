var expressWs = require('express-ws');
var app = require('express')();
var path = require("path")
var bodyParser = require("body-parser");
expressWs(app);

//Tell body Parser to be a middel ware.
app.use(bodyParser.urlencoded({extended: true}))


//Set the port. Can not be same as the Open MCT PORT.
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Telecomand server on port " + PORT);
});

//Set the routes.
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/html/telecommand.html"));
  });

// Post method.
app.post("/", function(req, res){

    // User body-Parser to get data out of form.
    var SendCommand = req.body.command;
    console.log(SendCommand);


    //Reload the page after post.
    res.sendFile(path.join(__dirname + "/html/telecommand.html"));

});