/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/

var theData = {TM:[{'Board temperature': '5'}]};

function Spacecraft() {

    this.state = {
        "comms.sent": 0,
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
        "obc_imgcnt": 1,

        //Test value
        "pwr.v": 300



    };

    getData();
    this.history = {};
    this.listeners = [];

    Object.keys(this.state).forEach(function (k) {
        this.history[k] = [];
    }, this);

    //How often it updates in 
    setInterval(function () {
        this.updateState();
        this.generateTelemetry();
    }.bind(this), 1000);

    console.log("Development spacecraft launched!");

};


Spacecraft.prototype.updateState = function () {
    //Test values for widgets (Commented out a few repetetive params since overwriting problems)
    this.state["boot_cause"] = Math.floor(Math.random()*9 + 1);
    this.state["tx_mode"] = Math.floor(Math.random()*6 + 1);
    this.state["rx_mode"] = Math.floor(Math.random()*6 + 1);
    this.state["mode_adcs"] = Math.floor(Math.random()*4 + 1);
    this.state["mode"] = Math.floor(Math.random()*5 + 1);
    this.state["bootcause"] = Math.floor(Math.random()*9 + 1);
    this.state["resetcause"] = Math.floor(Math.random()*7 + 1);
    //Test Values for TMTC
    this.state["reboot_in"] = theData["TM"][0]['Time until reboot'];
    this.state["baud"] = theData["TM"][0]['Baud rate'];
    this.state["temp_brd"] = theData["TM"][0]['Board temperature'];
    this.state["temp_pa"] = Math.floor(Math.random()*10+1);
    this.state["boot_count_tmtc"] = theData["TM"][0]['Number of reboots'];
    this.state["active_conf"] = Math.floor(Math.random()*10+1);
    this.state["bgnd_rssi"] = Math.floor(Math.random()*10+1);
    this.state["tot_tx_bytes"] = Math.floor(Math.random()*10+1);
    this.state["tot_rx_bytes"] = Math.floor(Math.random()*10+1);
    //this.state["boot_cause"] = Math.floor(Math.random()*10+1);
    this.state["last_contact"] = Math.floor(Math.random()*10+1);
    this.state["tx_guard"] = Math.floor(Math.random()*10+1);
    this.state["rx_guard"] = Math.floor(Math.random()*10+1);
    this.state["max_tx_time"] = Math.floor(Math.random()*10+1);
    //this.state["tx_mode"] = Math.floor(Math.random()*10+1);
    //this.state["rx_mode"] = Math.floor(Math.random()*10+1);

    //Power
    this.state["batt_volt"] = Math.floor(Math.random()*10+1);
    this.state["batt_temp"] = Math.floor(Math.random()*10+1);
    this.state["volt_solar_1"] = Math.floor(Math.random()*10+1);
    this.state["volt_solar_2"] = Math.floor(Math.random()*10+1);
    this.state["volt_solar_3"] = Math.floor(Math.random()*10+1);
    this.state["volt_solar_4"] = Math.floor(Math.random()*10+1);
    this.state["volt_solar_5"] = Math.floor(Math.random()*10+1);
    this.state["volt_3v3"] = Math.floor(Math.random()*10+1);
    this.state["cur_ecat_t1"] = Math.floor(Math.random()*10+1);
    this.state["cur_ecat_t2"] = Math.floor(Math.random()*10+1);
    this.state["cur_ecat_m"] = Math.floor(Math.random()*10+1);

    //ADCS
    //this.state["mode_adcs"] = Math.floor(Math.random()*10+1);
    this.state["angular_vector_x"] = Math.floor(Math.random()*10+1);
    this.state["angular_vector_y"] = Math.floor(Math.random()*10+1);
    this.state["angular_vector_z"] = Math.floor(Math.random()*10+1);
    this.state["temp_mag_1"] = Math.floor(Math.random()*10+1);
    this.state["temp_mag_2"] = Math.floor(Math.random()*10+1);
    this.state["attitude_q1"] = Math.floor(Math.random()*10+1);
    this.state["attitude_q2"] = Math.floor(Math.random()*10+1);
    this.state["attitude_q3"] = Math.floor(Math.random()*10+1);
    this.state["attitude_q4"] = Math.floor(Math.random()*10+1);
    this.state["error_est"] = Math.floor(Math.random()*10+1);
    this.state["tle_epochy"] = Math.floor(Math.random()*10+1);
    this.state["tle_epochd"] = Math.floor(Math.random()*10+1);
    this.state["tle_epochf"] = Math.floor(Math.random()*10+1);

    //ECAT
    this.state["ecat_temp"] = Math.floor(Math.random()*10+1);
    this.state["ecat_fwd"] = Math.floor(Math.random()*10+1);
    this.state["ecat_rev"] = Math.floor(Math.random()*10+1);


    //Test values for Cam
    this.state["boot_count_cam"] = 5;
    this.state["image_count"] = Math.floor(Math.random()*10+1);
    this.state["temp1"] = Math.floor(Math.random()*10+1);
    this.state["temp2"] = Math.floor(Math.random()*10+1);
    this.state["ivcc"] = Math.floor(Math.random()*10+1);
    this.state["icore"] = Math.floor(Math.random()*10+1);
    this.state["iddr"] = Math.floor(Math.random()*10+1);
    this.state["gain_target"] = Math.floor(Math.random()*10+1);

    //OBDH
    //this.state["mode"] = Math.floor(Math.random()*10+1);
    this.state["boot_count_obdh"] = Math.floor(Math.random()*10+1);
    this.state["uptime"] = Math.floor(Math.random()*10+1);
    this.state["clock"] = Math.floor(Math.random()*10+1);
    this.state["tele_size_flash"] = Math.floor(Math.random()*10+1);
    this.state["temp_ram"] = Math.floor(Math.random()*10+1);
    this.state["temp_mcu"] = Math.floor(Math.random()*10+1);
    this.state["i_PWM"] = Math.floor(Math.random()*10+1);
    this.state["gain_target"] = Math.floor(Math.random()*10+1);
    //this.state["resetcause"] = Math.floor(Math.random()*10+1);
    //this.state["bootcause"] = Math.floor(Math.random()*10+1);
    this.state["obc_imgcnt"] = Math.floor(Math.random()*10+1);

};

/**
 * Takes a measurement of spacecraft state, stores in history, and notifies 
 * listeners.
 */
Spacecraft.prototype.generateTelemetry = function () {
    var timestamp = Date.now(), sent = 0;
    Object.keys(this.state).forEach(function (id) {
        var state = { timestamp: timestamp, value: this.state[id], id: id};
        this.notify(state);
        this.history[id].push(state);
        this.state["comms.sent"] += JSON.stringify(state).length;
    }, this);
};

Spacecraft.prototype.notify = function (point) {
    this.listeners.forEach(function (l) {
        l(point);
    });
};

Spacecraft.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
};

const dgram = require('dgram');

var player = require('play-sound')(opts = {})

 player.play('example-server/beep.mp3', function (err) {
   if (err) throw err;
   console.log("Audio finished");
 });

function getData(){
    //Creates a buffer for a string
    const key = "1593574862";

    const message = key.toString(16);
    //Creates a udp socket for IPv4
    const client = dgram.createSocket("udp4");
    const IP = "130.240.14.144";
    const PORT = 5001;
    //Sends the buffer to a spesifyed ipaddr and port 
    //Then closes the socket. 
    console.log("Sent a message to: ", );
    client.send(message, 0, message.length, PORT, IP);
    //Listens to the incoming messages from server

    const recivedFirst = false;
    client.on('message', (msg, rinfo) =>{
        if(msg.toString() == "AKW"){
            console.log("Subscribed");
        }
        else{
            console.log("HEJ");
            theData = JSON.parse(msg);
        }
        
    });

}

module.exports = function () {
    return new Spacecraft()
};