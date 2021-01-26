# D0020E-Open-MCT
As studen project at Lulea Tekniska Universitet for D0020E. It uses Open MCT from Nasa to build an MCT(Mission Control Software) to connect to a DBU (Digital Baseband Unit).

## Installation
To building and running D0020E-Open-MCT in you local enviorment you will need Node.js installed.

1. **git clone https://github.com/matnij-4/D0020E-Open-MCT**
2. **cd D0020E-Open-MCT**
3. **npm install**
4. **npm start**

To se up the program for the first time you need to do some more configurations. That is if you want it to look a bit more nice.

1. **Go to my Items folder in the program.**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp1.PNG?raw=true)

2. **Choose import JSON**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp2.PNG?raw=true)

3. **Navigate to the config folder where you install the program**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp3.PNG?raw=true)

4. **Now you should have the pre set layout that you can eddit.**
![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/configHelp4.PNG?raw=true)

## Layout

If you wan to creat you own layout for the systems and telemetry data you can. Just adde it with the creat button and put it in my Items. Those settings are only stored in the browser cache.

For longer storage of you setting you can export them as an JSON files and importem at a later date.

## Architecture

A simple version of the architecture for the program can bee senn in the picture below.

![alt text](https://github.com/matnij-4/D0020E-Open-MCT/blob/main/images/architecture.png?raw=true)

Open MCT as you can see have no direct comminucation to the outside. 

## Plugin

### Dictionary
**TO DO**

The dictionary plugin set up the formant for the data that is going to be collected. It dose not get any of the data only set the format.

### Realtime
**TO DO**

It collects the data fromt he JS server and sends it to Open MCT.

### Layout
This plugin handels the subfolders for the subsystems. It dividends the telemetri data into subfolders to make it easier to find the right telemetri. As well it creats premade Status Widgets and adds them to the corresponding subsystem.

### Historical
**TO DO**


