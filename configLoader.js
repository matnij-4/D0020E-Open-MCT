const checklist = [
    "rtIp",
    "rtPort",  
    "rtKey",
    "dbIp",
    "dbPort",
    "dbUname",
    "dbPass"
];

function ConfigLoader(){
    var data = require('./config/config.json');
    if(Object.keys(checklist).length == Object.keys(data).length){
        for(var i = 0; i < Object.keys(checklist).length; i++){
            if(checklist[i] in data){
                if(data[checklist[i]] == null || data[checklist[i]] == ''){
                    console.log("Didn't find value for the key");
                    data = null;
                }
            }
            else{
                console.log("Didn't match keys");
                data = null;
            }
        }
    }
    else{
        console.log("The two list are not the same size")
        data = null;
    }
    ConfigLoader.prototype.getData = function(){
        return data;
    }

}
module.exports = function(){
    return new ConfigLoader()
};
