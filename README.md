# D0020E-Open-MCT
As studen project at Lulea Tekniska Universitet for D0020E. It uses Open MCT from Nasa to build an MCT(Mission Control Software) to connect to a DBU (Digital Baseband Unit).

## Installation
To building and running D0020E-Open-MCT in you local enviorment you will need Node.js installed.

1. **git clone https://github.com/matnij-4/D0020E-Open-MCT**
2. **cd D0020E-Open-MCT**
3. **npm install**
4. **npm start**

To set up the program for the first time you need to do some more configurations. That is if you want it to look a bit more nice.

1. **Go to my Items folder in the program.**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp1.PNG?raw=true)

2. **Choose import JSON**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp2.PNG?raw=true)

3. **Navigate to the config folder where you install the program**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp3.PNG?raw=true)

4. **Now you should have the pre set layout that you can eddit.**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp4.PNG?raw=true)

## Layout

If you want to creat you own layout for the systems and telemetry data you can. Just add it with the create button and put it in my Items. Those settings are only stored in the browser cache.

For longer storage of you setting you can export them as an JSON files and import them at a later date.

## Architecture

A simple version of the architecture for the program can bee senn in the picture below.

![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/architecture.png?raw=true)

Open MCT as you can see have no direct comminucation to the outside. 

## Plugins

### Dictionary

Dictionary plugin is used to populate our object tree which is created by addRoot. We have a get method for our Json file. We define and register an objectProvider and a composition provider. These are used to provide structure to our root object. There is more to read about this in the github tutorial from nasa below. 

### Realtime

This is a basic realtime telemetry plugin that uses websockets. A provider is created which supports sending subscribe and unsubscribe messages. 

### Layout
This plugin handles the subfolders for the subsystems. It divides the telemetry data into subfolders to make it easier to find the right telemetri. It also creates premade Status Widgets and adds them to the corresponding subsystem.

### TimeConductor

This plugin is initialized in index.html. It is a default plugin from openMCT (https://github.com/nasa/openmct/blob/master/API.md#the-time-conductor). This plugin is used to allow the user to choose a specific time frame to display data from in graphs.

## How to add telemetry

If you wish to add your own telemetry data, you will have to add the data variable to the spacecraft state, this state gets updated when new data is received via the realtime-server. 

![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/State.png?raw=true)

Json files are received from the server in the following format:

![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/FormatJson.png?raw=true)

which is parsed and updated into the state in spacecraft which is then displayed in openMCT. The variable you will want to update has to be sent in this format and it has to be defined in the state in spacecraft.js.

## Config file

The config file has a checklist in the project that imports a config file with ips, ids and ports.

When importing a config file the program checks:

- If the keys are the same as in a check file. The check is located in the configloader

- If the key has a attached value

If one of the conditions above are fulfilled the importated data is set to *null*

  

### Realtime server

The realtime sever(rt) is where the data is received in realtime and will be the primary server used during operational use.

  

### Historical Database Server

The Historical Database server (db) is responsible for storing data. The database server will be used when displaying old data is needed. In this project we used MySql server for retreving stored data. There were some issues with using MySql server and NodeJS. We needed to install a certain version of MySql in this project we used MySql server 5.7.33 to make it work with NodeJS. Every table is a key in openmct and every table have two columns: value and date. One for stroring values and the other for storing the timestamp as can be seen below. 

![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/sqlTable.png?raw=true)

Everytime a telemetry collection of data is opened a querry is sent to the database server asking for a datasent in a specific timeinterval. 


  

### Config fields

- rtIp 
Specifies the ip address for the real-time server. The config file only accepts a IPv4 address.

- rtPort 
Specifies the port of the real-time server.

- rtKey 
Authentication key for establishing a connection to real-time server.

- dbIp
Specifies the IP address for the historical database

- dbPort 
Specifies the port for the historical database

- dbUname
Specifies the username for login into the historical server.

- dbPass 
Specifies the password for the historical database.

- dbDatabase
Specifies which database you want to use for the database sever
