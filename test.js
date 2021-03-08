// <--------------------Create tables ---------------->
HistoryLoader.prototype.createTables = function(data){
        
    for(var keyTo in data){
        helpTables(data[keyTo]);
    }
}

HistoryLoader.prototype.helpTables = function(data){
    var sql = "";
    for(var key in data){
        sql += "CREATE TABLE "+ key +" (value VARCHAR(255), date datetime); ";
        //sql2 += "INSERT INTO " + key + " (value, time) VALUES ('" + (Math.random()*10)+ "', '2021-02-14'); ";
    }
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log("Tables created!");
    });
};

HistoryLoader.prototype.helpTables = function (data){
    var sql = "";
    for(var key in data){
        sql += "CREATE TABLE "+ key +" (value VARCHAR(255), date datetime); ";
        //sql2 += "INSERT INTO " + key + " (value, time) VALUES ('" + (Math.random()*10)+ "', '2021-02-14'); ";
    }
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log("Tables created!");
    });
};

//<----------------------- Insert a lot of data ----------------------------->
