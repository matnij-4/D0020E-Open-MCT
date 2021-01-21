/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/

function Spacecraft() {
    this.state = {
        "comms.sent": 0,
        "reboot_in": 1,
        "baud": 1,
        "temp_brd": 1,
        "temp_pa": 1,
        "boot_count": 1,
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
        "boot_count": 1,
        "image_count": 1,
        "temp1": 1,
        "temp2": 1,
        "ivcc" : 1,
        "icore": 1,
        "iddr": 1,
        "gain_target": 1,
        "mode": 1,
        "boot_count": 1,
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
    ////this.state["pwr.b"] = 5 + Math.floor(Math.random() * 2);
    
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

module.exports = function () {
    return new Spacecraft()
};