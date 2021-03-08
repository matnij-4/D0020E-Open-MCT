var mysql = require('mysql');
var ConfigLoader = require('./configLoader');
var configloader = new ConfigLoader();


function HistoryLoader(){   
};

function connectServer(){
    var config = configloader.getData();
    var con = mysql.createConnection({
        host: config["dbIp"],
        user: config["dbUname"],
        password: config["dbPass"],
        database: config["dbDatabase"],
        multipleStatements: 'true'
    });
    con.connect();
    return con;
}

HistoryLoader.prototype.getServerData = function(key, start, stop, callback) {
    var con = connectServer();
    const startDate = new Date(start);
    const stopDate = new Date(stop);
    var realStart = startDate.getFullYear() + "-"+(startDate.getMonth()+1) + "-" +startDate.getDate()+ " " 
    + startDate.getHours()+":"+startDate.getMinutes()+":"+ startDate.getSeconds();
    var realStop = stopDate.getFullYear() + "-"+(stopDate.getMonth()+1) + "-" +stopDate.getDate()+ " " 
    + stopDate.getHours()+":"+stopDate.getMinutes()+":"+ stopDate.getSeconds();

    var sql = "SELECT * FROM " + key + " WHERE date > '"+realStart+"' AND date < '"+ realStop+"';";
    
    con.query(sql, function(err, result, fields){
        if(err) console.log(err + "Database Server not connected.");
        return callback(result);
    });
    con.end();
};

module.exports = function(){
    return new HistoryLoader;
};

