var mysql = require('mysql');
const promiseList = [];



this.state = {
    "reboot_in": 1,
    "baud": 1,
    "temp_brd": 1,
    "temp_pa": 1,
    "boot_count_tmtc": 1,
    "active_conf": 1,
    "bgnd_rssi": 1,
    "tot_tx_bytes": 1,
    "tot_rx_bytes": 1,
    "boot_cause": 1,
    "last_contact": 1,
    "tx_guard": 1,
    "rx_guard": 1,
    "max_tx_time": 1,
    "tx_mode": 1,
    "rx_mode": 1,
    "batt_volt": 1,
    "batt_temp": 1,
    "volt_solar_1": 1,
    "volt_solar_2": 1,
    "volt_solar_3": 1,
    "volt_solar_4": 1,
    "volt_solar_5": 1,
    "volt_3v3": 1,
    "cur_ecat_t1": 1,
    "cur_ecat_t2": 1,
    "cur_ecat_m": 1,
    "mode_adcs": 1,
    "angular_vector_x": 1,
    "angular_vector_y": 1,
    "angular_vector_z": 1,
    "temp_mag_1": 1,
    "temp_mag_2": 1,
    "attitude_q1": 1,
    "attitude_q2": 1,
    "attitude_q3": 1,
    "attitude_q4": 1,
    "error_est": 1,
    "tle_epochy": 1,
    "tle_epochd": 1,
    "tle_epochf": 1,
    "ecat_temp": 1,
    "ecat_fwd": 1,
    "ecat_rev": 1,
    "boot_count_cam": 1,
    "image_count": 1,
    "temp1": 1,
    "temp2": 1,
    "ivcc" : 1,
    "icore": 1,
    "iddr": 1,
    "gain_target": 1,
    "mode": 1,
    "boot_count_obdh": 1,
    "uptime": 1,
    "clock": 1,
    "tele_size_flash": 1,
    "temp_ram": 1,
    "temp_mcu": 1,
    "i_PWM": 1,
    "resetcause": 1,
    "bootcause": 1,
    "obc_imgcnt": 1
}

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AeXJxSg/&',
    database: 'test',
    multipleStatements: 'true'
});


// con.connect(function(err){
//     if(err) throw err;
//     console.log("Connected");
//     var sql; 
//     for(var key in this.state){
//         sql = "CREATE TABLE "+ key +" (value VARCHAR(255), time VARCHAR(255)); ";
//     }
//     promiseList.push(new Promise(function(resolve, reject){
        
//         console.log(sql);
        
//         con.query(sql, function (err, result, fields){
//             if(err) throw err;
//             console.log("Table created:");
//         });
//         resolve(sql);
//     }));
    
// });
var sql2 = "";

var sql = "";

for(var key in this.state){
    sql += "CREATE TABLE "+ key +" (value VARCHAR(255), time VARCHAR(255)); ";
    //sql2 += "INSERT INTO " + key + " (value, time) VALUES ('" + (Math.random()*10)+ "', '2021-02-14'); ";
}

con.connect(function(err){
    // con.query(sql, function(err, result) {
    //     if (err) throw err;
    //     console.log(sql);
    // });
    con.query(sql, function(err, result){
        if(err) throw err;

    });
});



Promise.all(promiseList).then(function(results){
    console.log(results);
});
