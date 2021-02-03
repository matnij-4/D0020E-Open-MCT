//This client communicates with test server created by Anton. 
const dgram = require('dgram');

function UDPSocket(){
    //Creates a buffer for a string
    const message = new Buffer("Some bytes");
    //Creates a udp socket for IPv4
    const client = dgram.createSocket("udp4");
    //Sends the buffer to a spesifyed ipaddr and port 
    //Then closes the socket. 
    client.send(message, 0, message.length, 20001, '127.0.0.1', (err) =>{
        client.close();
    });
}
//Need to export to be used in openmct
module.exports = UDPSocket;
