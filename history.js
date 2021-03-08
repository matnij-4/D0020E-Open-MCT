var mysql = require('mysql');



function HistoryLoader(){
    // this.getServerData("batt_temp", 0, getFullDate(),function(result){
    //     for(var key in result){
    //         console.log("Value: " + result[key].value+ " date: " + result[key].date);
    //     }
    // });
    
};


// function getFullDate(){
//     var date = new Date();
//     return date.getFullYear()+ "-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
// }

// HistoryLoader.prototype.insert = function(key, value){
//     var sql = "INSERT INTO "+ key + " (value, date) VALUES ('"+value+"', '"+getFullDate()+"')";
//     con.query(sql,function(err, result){
//         if(err) throw err;
//         console.log("Line inserted...");
//         return;
//     });
// }

function connectServer(){
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'AeXJxSg/&',
        database: 'test',
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

    console.log("Date: " + stopDate.toLocaleDateString());
    console.log("Date: " + stopDate.toLocaleTimeString());
    console.log("Realdate: " + realStart);
    console.log("Realstop: " + realStop);
    var sql = "SELECT * FROM " + key + " WHERE date > '"+realStart+"' AND date < '"+ realStop+"';";
    
    con.query(sql, function(err, result, fields){
        if(err) throw err;
        return callback(result);
    });
    con.end();
};

module.exports = function(){
    return new HistoryLoader;
};

