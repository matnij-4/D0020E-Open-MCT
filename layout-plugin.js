const constNameSpace = "demo";
const constKey = "demo-objects";

//
function serializeId(id) {
    return id.namespace + ':' + id.key;
}

//
function deserializeId(serializedId) {
    var tokens = serializedId.split(':');
    return {
        namespace: tokens[0],
        key: tokens[1]
    }; 
}

//
function addIdentifier(object, identifier) {
    object.identifier = identifier;
    return object;
}




//The get dictionar funcion for getting the Json files data.
function getDictionary(jasonName) {
    return http.get(jasonName)
        .then(function (result) {
            return result.data;
        });
}

var objectFolder = {
    get: function (identifier) {
        return getDictionary('/nominal-beacon.json').then( (dictionary) => {
            if (identifier.key === constKey) {
                return {
                    identifier: identifier,
                    name: dictionary.name,
                    type: 'folder',
                    location: 'ROOT'
                };
            } else {
                return Promise.resolve();
                
            }
        });
    }
};


//Composition Provider for Layout.
var compositionProviderFolder= {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === constNameSpace &&
               domainObject.composition !== undefined &&
               (domainObject.identifier.key === constKey);
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


function DictionaryPlugin() {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: constNameSpace,
            key: constKey
        });

        openmct.objects.addProvider(constNameSpace, objectFolder);

        openmct.composition.addProvider(compositionProviderFolder);

    

    }
};