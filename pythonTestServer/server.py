import socket
import os
import time

localIP = "127.0.0.1"
localPort = 20001

#Creates a udpsocket for IPv4
serverSock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

serverSock.bind((localIP, localPort))
#Listens to the previously defined ip and port.
#Prints out what it recives.
while True:
	data, addr = serverSock.recvfrom(1024)
	print ("Message: ", data, " ip: ", addr)
	
