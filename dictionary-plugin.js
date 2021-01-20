//The get dictionar funcion for getting the Json files data.
function getDictionary(jasonName) {
    return http.get(jasonName)
        .then(function (result) {
            return result.data;
        });
}

var objectProviderNom = {
    get: function (identifier) {
        return getDictionary('/nominal-beacon.json').then( (dictionary) => {
            if (identifier.key === 'beaconNom') {
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
                    location: 'nominal.beacon:beaconNom'
                };
                
            }
        });
    }
};


var objectProviderCharg = {
    get: function (identifier) {
        return getDictionary('/charging-beacon.json').then( (dictionary) => {
            if (identifier.key === 'beaconCharg') {
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
                    location: 'charging.beacon:beaconCharg'
                };
                
            }
        });
    }
};


var compositionProviderNom= {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'nominal.beacon' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary('/nominal-beacon.json')
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: 'nominal.beacon',
                        key: m.key
                    };
                });
            });
    }
};


var compositionProviderCharg = {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'charging.beacon' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary('/charging-beacon.json')
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: 'charging.beacon',
                        key: m.key
                    };
                });
            });
    }
};


function DictionaryPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'nominal.beacon',
            key: 'beaconNom'
        });

        openmct.objects.addRoot({
            namespace: 'charging.beacon',
            key: 'beaconCharg'
        });



        openmct.objects.addProvider('nominal.beacon', objectProviderNom);
        openmct.objects.addProvider('charging.beacon', objectProviderCharg);


        openmct.composition.addProvider(compositionProviderNom);
        openmct.composition.addProvider(compositionProviderCharg);

    
        openmct.types.addType('telemetry', {
            name: 'Telemetry',
            description: 'Telemetry point',
            cssClass: 'icon-telemetry'
        });



    }
};