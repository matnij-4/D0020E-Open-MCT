/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/

function Spacecraft() {
    this.state = {
        "comms.sent": 0,
        "pwr.v": 30,
        "pwr.b": 5
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
    this.state["pwr.v"] = 30 + Math.floor(Math.random() * 3);
    this.state["pwr.b"] = 5 + Math.floor(Math.random() * 2);
    
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