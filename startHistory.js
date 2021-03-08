var HistoryLoader = require('./history');
var historyloader = HistoryLoader();
var data = {
    "TMTC": [
    {   "reboot_in": "20050",
        "baud": "2450",
        "temp_brd": "38",
        "temp_pa": "66",
        "boot_count_tmtc": "5",
        "active_conf": "2",
        "bgnd_rssi": "-145",
        "tot_tx_bytes": "45050",
        "tot_rx_bytes": "55080",
        "boot_cause": "3",
        "last_contact": "2021-02-8-04:41:48",
        "tx_guard": "25",
        "rx_guard": "50",
        "max_tx_time": "5000",
        "tx_mode": "3",
        "rx_mode": "2"
    }],
"POWER":[
    {
        "batt_volt":"5",
        "batt_temp":"56",
        "volt_solar_1":"3100",
        "volt_solar_2":"3005",
        "volt_solar_3":"3070",
        "volt_solar_4":"3090",
        "volt_solar_5":"3200",
        "volt_3v3":"3060",
        "cur_ecat_t1":"1600",
        "cur_ecat_t2":"1550",
        "cur_ecat_m":"1570"
    }],
"ADCS":[
    {
        "mode_adcs":"2",
        "angular_vector_x":"16",
        "angular_vector_y":"15",
        "angular_vector_z":"15",
        "temp_mag_1":"45",
        "temp_mag_2":"45",
        "attitude_q1":"0",
        "attitude_q2":"0.5",
        "attitude_q3":"0",
        "attitude_q4":"0",
        "error_est":"0",
        "tle_epochy":"2021",
        "tle_epochd":"50",
        "tle_epochf":"0"
    }],
"ECAT":[
    {
        "ecat_temp":"38",
        "ecat_fwd":"15",
        "ecat_rev":"15"
    }],
"CAM":[
    {
        "boot_count_cam":"1000",
        "image_count":"202",
        "temp1":"32",
        "temp2":"32",
        "ivcc":"400",
        "icore":"250",
        "iddr":"205",
        "gain_target":"50"
    }],
"OBDH":[
    {
        "mode":"2",
        "boot_count_obdh":"38",
        "uptime":"50000",
        "clock":"2021-02-09T06:57:33",
        "tele_size_flash":"64000",
        "temp_ram":"42",
        "temp_mcu":"40",
        "i_PWM":"200",
        "resetcause":"4",
        "bootcause":"4",
        "obc_imgcnt":"128"
    }]
}
if(data === undefined){
    console.log("it is undefined");
}
var tables = {
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
// const start = 1614761794396;
// const dateObject = new Date(start);
// console.log(dateObject.getFullYear() + "-"+(dateObject.getMonth()+1) + "-" +dateObject.getDay()+ " " 
// + dateObject.getHours()+":"+dateObject.getMinutes()+":"+ dateObject.getSeconds());
var id = "batt_temp";
//"{ timestamp: " +  new Date(result[key].date).getTime() + ", value: '" + result[key].value +"', id: '"+id+"' }"
historyloader.getServerData("batt_temp", 1614168000000, 1614772800000, function(result){
    var s = "[]";
    var obj = JSON.parse("[]");
    for(var key in result){
        obj.push({
            timestamp: result[key].date,
            value: result[key].value,
            id: id
        }); 
    }
    console.log(JSON.stringify(obj));
});
