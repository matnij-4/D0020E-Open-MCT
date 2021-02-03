#!/usr/bin/env python3

import socket
import os
import threading
import time
import sys

#UDP Lnk Object

class udp_link:
    def __init__(self):
        print("Initializing Connection")
        self._udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self._udp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self._udp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        self._server_ip=""
        self._server_port=0
        self._server_address=()
        self._status="disconnected"

    def subscribe(self, IP, port, subscription_key):
        print("Subscribing")
        self._server_ip=IP
        self._server_port=port
        try:
            sent = self._udp_socket.sendto(subscription_key.encode(), (self._server_ip, self._server_port))
            self._udp_socket.settimeout(2)
            self._rtrn_msg, server = self._udp_socket.recvfrom(4096)
        except socket.timeout:
            print("Unable to contact server.")
            self._udp_socket.close()
            exit(0)
        self._udp_socket.settimeout(None)
        self._rtrn_msg=self._rtrn_msg.decode()
        if str(self._rtrn_msg) == "AKW":
            self._status = "connected"
            print('Subscription to %s confirmed' % self._server_ip)
            thread = threading.Thread(target=self.listen, args=())
            thread.daemon = True
            thread.start()
        else:
            print('ERROR: Failed to subscribe to %s' % self._server_ip)
            return

    def unsubscribe(self):
        print("Unsubscribing")
        unsub="unsubscribe".encode()
        sent = self._udp_socket.sendto(unsub, (self._server_ip, self._server_port))


    def listen(self):
        while self._status != "disconnected":
            print("Listening for data.")
            data, address = self._udp_socket.recvfrom(4096)
            if data.decode() == "unsubscribe":
                print('Unubscription to %s confirmed' % self._server_ip)
                self._status="disconnected"
            elif data.decode() == "FAIL":
                print("Connection terminated by Host")
                self._status="disconnected"
            else:
                process_data(data.decode())
        print("Press \'q\' to exit")

def create_key():
    return "1593574862"

def process_data(data):
    print("Im doing shit lol!")
    print('%s' % data)


#udp_socket.setsockopt(socket.SOL_SOCKET,socket.SO_BROADCAST,1)

#SERVER_IP="130.240.14.144"
#SERVER_PORT=5001

SERVER_IP="127.0.0.1"
SERVER_PORT=20001
print("Im alive!")
client_server=udp_link()
client_server.subscribe(SERVER_IP,SERVER_PORT,create_key())
while True:
    for line in sys.stdin:
        if 'q' == line.rstrip():
            if client_server._status == "connected":
                client_server.unsubscribe()
                exit(0)
            exit(0)
        else:
            print("WE dont have shell support!!, WTF?! q, use q, only q!")
