function getDictionary() {
    return http.get('/dictionary.json')
        .then(function (result) {
            return result.data;
        });
}

function getDictionaryBeacon() {
    return http.get('/beacon.json')
        .then(function (result) {
            return result.data;
        });
}

var objectProvider = {
    get: function (identifier) {
        return getDictionary().then( (dictionary) => {
            if (identifier.key === 'spacecraft') {
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
                    location: 'example.taxonomy:spacecraft'
                };
                
            }
        });
    }
};


var objectProviderBeacon = {
    get: function (identifier) {
        return getDictionaryBeacon().then( (dictionary) => {
            if (identifier.key === 'beacon') {
                return {
                    identifier: identifier,
                    name: dictionary.name,
                    type: 'folder',
                    location: 'ROOT'
                };
            }
        });
    }
};



var compositionProvider = {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'example.taxonomy' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary()
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: 'example.taxonomy',
                        key: m.key
                    };
                });
            });
    }
};


var compositionProviderBeacon = {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'nominal.beacon' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionaryBeacon()
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

function DictionaryPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'example.taxonomy',
            key: 'spacecraft'
        });
        
        openmct.objects.addRoot({
            namespace: 'nominal.beacon',
            key: 'beacon'
        });

        openmct.objects.addProvider('example.taxonomy', objectProvider);

        openmct.objects.addProvider('nominal.beacon', objectProviderBeacon);


        openmct.composition.addProvider(compositionProvider);

        openmct.composition.addProvider(compositionProviderBeacon);


        openmct.types.addType('telemetry', {
            name: 'Telemetry',
            description: 'Generic telemetry point',
            cssClass: 'icon-telemetry'
        });

    }
};