const constNameSpace = "folder";
const constKey = "demo-objects";



var demoModels;


function serializeId(id) {
    return id.namespace + ':' + id.key;
}

function deserializeId(serializedId) {
    var tokens = serializedId.split(':');
    return {
        namespace: tokens[0],
        key: tokens[1]
    }; 
}

function addIdentifier(object, identifier) {
    object.identifier = identifier;
    return object;
}



function LayoutPlugin() {
    return function install() {


        getDictionary("/layout.json").then((dictionary) => {
            demoModels = dictionary;
            

             //Add new root for demo objects
        openmct.objects.addRoot({
            namespace: constNameSpace,
            key: constKey
        });

        //2. Add composition provider for demo objects
        openmct.composition.addProvider({
            appliesTo: function (object) {
                return object.identifier.namespace === constNameSpace && 
                    object.composition !== undefined &&
                    (object.identifier.key === constKey || 
                    demoModels[serializeId(object.identifier)] !== undefined);
            },
            load: function (model) {
                var id = model.identifier;
                if (id.key === constKey) {
                    return Promise.resolve(Object.keys(demoModels).filter(function (key) {
                        return demoModels[key].location === constNameSpace + ":" +constKey;
                    }).map(function (key) {
                        var childId = deserializeId(key); 
                        return {
                            namespace: childId.namespace,
                            key: childId.key 
                        };
                    }));
                } else {
                    return Promise.resolve(
                        demoModels[serializeId(id)].composition.map(function (key) {
                           var childId = deserializeId(key);
                           return {
                                namespace: childId.namespace,
                                key: childId.key 
                           }
                        })
                    );
                }
            }
        });

        //3. Add object provider
        openmct.objects.addProvider(constNameSpace, {
            get: function (id) {
                if (id.key === constKey) {
                    return Promise.resolve({
                        identifier: {
                            key: constKey,
                            namespace: constNameSpace
                        },
                        type: 'folder',
                        location: 'ROOT',
                        name: 'Demo Objects',
                        composition: []
                   });
                } else {
                    return Promise.resolve(addIdentifier(demoModels[serializeId(id)], id));
                }
            }
        });
        
            
        
        });

       


        
    }
};