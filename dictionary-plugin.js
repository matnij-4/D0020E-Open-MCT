const NAMESPACE = "beacon.telemetry";
const BEACONKEY = "beacon";

//The get dictionar funcion for getting the Json files data.
function getDictionary(jasonName) {
    return http.get(jasonName)
        .then(function (result) {
            return result.data;
        });
}

var objectProvider = {
    get: function (identifier) {
        return getDictionary('/config/beacon.json').then( (dictionary) => {
            if (identifier.key === BEACONKEY) {
                return {
                    identifier: identifier,
                    name: dictionary.name,
                    type: 'folder',
                    location: 'ROOT'
                };
            } else {
                var measurement = dictionary.measurements.filter( (m) => {
                    return m.key === identifier.key;
                })[0];
                
                
                return {
                    identifier: identifier,
                    name: measurement.name,
                    type: 'telemetry',
                    telemetry: {
                        values: measurement.values
                    },
                    location: NAMESPACE + ":" + BEACONKEY
                };
                
            }
        });
    }
};

var compositionProvider= {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === NAMESPACE &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary('/config/beacon.json')
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: NAMESPACE,
                        key: m.key
                    };
                });
            });
    }
};


function DictionaryPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: NAMESPACE,
            key: BEACONKEY
        });

        openmct.objects.addProvider(NAMESPACE, objectProvider);


        openmct.composition.addProvider(compositionProvider);


        openmct.types.addType('telemetry', {
            name: 'Telemetry',
            description: 'Telemetry point',
            cssClass: 'icon-telemetry'
        });

        //Hello world :D

    }
};