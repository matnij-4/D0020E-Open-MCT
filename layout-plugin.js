const constNameSpace = "demo";
const constKey = "demo-objects";


//The get dictionar funcion for getting the Json files data.
function getDictionary(jasonName) {
    return http.get(jasonName)
        .then(function (result) {
            return result.data;
        });
}

var objectFolder = {
    get: function (identifier) {
        return getDictionary('/layout.json').then( (dictionary) => {
            if (identifier.key === constNameSpace) {
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
                    location: constNameSpace+ ":" + constKey
                };
                
            }
        });
    }
};


//Composition Provider for Layout.
var compositionProviderFolder= {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === constNameSpace &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary('/layout.json')
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: constNameSpace,
                        key: m.key
                    };
                });
            });
    }
};


function LayoutPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: constNameSpace,
            key: constKey
        });

        openmct.objects.addProvider(constNameSpace, objectFolder);

        openmct.composition.addProvider(compositionProviderFolder);

    

    }
};