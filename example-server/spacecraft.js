/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/
var ConfigLoader = require('./../configLoader');
var configloader = new ConfigLoader();
var theData = {TMTC:[{}]};

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

    this.getData();
    this.history = {};
    this.listeners = [];

    Object.keys(this.state).forEach(function (k) {
        this.history[k] = [];
    }, this);


    console.log("Development spacecraft launched!");

};


Spacecraft.prototype.updateState = function () {
   


    for(var subSystem in theData){
        this.loopData(theData[subSystem]);
    }

    // var LCdate = theData["TMTC"][0]["last_contact"];
    // LCdate=LCdate.split("-").join(":");
    // LCdate=LCdate.split(":");
    // var datum = new Date(Date.UTC('20'+LCdate[0],LCdate[1]-1,LCdate[2],LCdate[3],LCdate[4],LCdate[5]));
    // datum=datum.getTime();
    // this.state["last_contact"] = datum;

    // this.state["last_contact"] = datum;
    // this.state["tx_guard"] = theData["TMTC"][0]["tx_guard"];
    // this.state["rx_guard"] = theData["TMTC"][0]["rx_guard"];
    // this.state["max_tx_time"] = theData["TMTC"][0]["max_tx_time"];


};

Spacecraft.prototype.loopData = function(data){


    for(var keyTo in data[0]){

        if(keyTo in this.state){
            this.state[keyTo] = data[0][keyTo];
        }
    }
}

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


Spacecraft.prototype.getData = function (){
    var data = configloader.getData();
    //Creates a buffer for a string
    const key = data["rtKey"];

    const message = key.toString(16);
    //Creates a udp socket for IPv4
    const client = dgram.createSocket("udp4");
    const IP = data["rtIp"];
    const PORT = parseInt(data["rtPort"]);
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
            theData = JSON.parse(msg);
            console.log(theData["TMTC"][0]["reboot_in"]);
            this.updateState();
            this.generateTelemetry();
        }
        
    });

};




module.exports = function () {
    return new Spacecraft()
};