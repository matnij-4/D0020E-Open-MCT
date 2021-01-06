var express = require('express');
const { request } = require('http');
var path = require('path');

function TelecommandServer() {

    var router = express.Router();
    

    router.get('/', function (req, res){
        res.sendFile(path.join(__dirname + '/../telecommand.html'))
    });

    return router
}

module.exports = TelecommandServer;

