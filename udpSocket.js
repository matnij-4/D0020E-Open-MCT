//This client communicates with test server created by Anton. 
const dgram = require('dgram');

function UDPSocket(){
    //Creates a buffer for a string
    const key = "1593574862";

    const message = key.toString(16);
    //Creates a udp socket for IPv4
    const client = dgram.createSocket("udp4");
    const IP = "130.240.14.144";
    const PORT = 5001;
    //Sends the buffer to a spesifyed ipaddr and port 
    //Then closes the socket. 
    console.log("Sent a message to: ", )
    client.send(message, 0, message.length, PORT, IP);
    //Listens to the incoming messages from server

    const recivedFirst = false;
    client.on('message', (msg, rinfo) =>{
        if(msg.toString() == "AKW"){
            console.log("Subscribed");
        }
        console.log(msg.toString());
    });

}
//Need to export to be used in openmct
module.exports = UDPSocket;
