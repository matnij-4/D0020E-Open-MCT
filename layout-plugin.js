const constNameSpace = "demo";
const constKey = "demo-objects";



//The object provider.
var objectFolder = {
    get: function (identifier) {
        return getDictionary('/layout.json').then( (dictionary) => {
            if (identifier.key === constKey) {
                return {
                    identifier: identifier,
                    name: dictionary.name,
                    type: 'folder',
                    location: 'ROOT',
                    composition: []
                };
            } else {
                var measurement = dictionary.folders.filter( (m) => {
                    console.log(m);
                    return m;
                });
                
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
                return dictionary.folders.map(function (m) {
                    return {
                        namespace: constNameSpace,
                        key: m.key
                    };
                });
            });
    }
};


//The install function for Open MCT.
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