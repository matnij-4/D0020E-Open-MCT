# D0020E-Open-MCT
As studen project at Lulea Tekniska Universitet for D0020E. It uses Open MCT from Nasa to build an MCT(Mission Control Software) to connect to a DBU (Digital Baseband Unit).

## Installation
To building and running D0020E-Open-MCT in you local enviorment you will need Node.js installed.

1. **git clone https://github.com/matnij-4/D0020E-Open-MCT**
2. **cd D0020E-Open-MCT**
3. **npm install**
4. **npm start**


## Architecture

A simple version of the architecture for the program can bee senn in the picture below.

![alt text](https://github.com/matnij-4/D0020E-Open-MCT/tree/main/tele-server)

## Plugin

### Dictionary
**TO DO**
The dictionary plugin set up the formant for the data that is going to be collected. It dose not get any of the data only set the format.

### Realtime
**TO DO**

It collects the data fromt he JS server and sends it to Open MCT.

### Layout
This plugin handels the subfolders for the subsystems. It dividends the telemetri data into subfolders to make it easier to find the right telemetri. As well it creats premade Status Widgets and adds them to the corresponding subsystem.

