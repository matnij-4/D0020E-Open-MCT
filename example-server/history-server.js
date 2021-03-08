const { json } = require('body-parser');
var express = require('express');
var HistoryLoader = require('./../history');
var historyloader = HistoryLoader();


function HistoryServer(spacecraft) {
    var router = express.Router();

    router.get('/:pointId', function (req, res) {
        var start = +req.query.start;
        var end = +req.query.end;
        var ids = req.params.pointId.split(',');
        console.log("Start: " + start);
        console.log("End: " + end);
        console.log("ID: " + ids);

        historyloader.getServerData(ids, start, end, function(result){
            var obj = JSON.parse("[]");
            console.log(result);
            for(var key in result){
                obj.push({
                    timestamp: new Date(result[key].date).getTime(),
                    value: result[key].value,
                    id: ids[0]
                }); 

            }
            res.status(200).json(obj).end();
        });

        // var response = ids.reduce(function (resp, id) {
        //     return resp.concat(spacecraft.history[id].filter(function (p) {
        //         return p.timestamp > start && p.timestamp < end;
        //     }));
        // }, []);
        // console.log(response);
        // res.status(200).json(response).end();
    });

    return router;
}

module.exports = HistoryServer;

