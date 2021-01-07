var expressWs = require('express-ws');
var app = require('express')();
expressWs(app);


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Telecomand server on port " + PORT);
});

//Set the routes.
app.get('/', function (req, res) {
    res.sendFile("/tele-server/telecommand.html");
  });