// INSTANTIATE MAP 
// set map style
var map = L.map('map').setView([47.53, -120.8], 8);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    
}).addTo(map);
map.zoomControl.setPosition('bottomleft')

//COLORS OPTIONS FOR MULTITRACK LAYERS
const COLORS = [
"#800020",
"#4B003A",
"#FFB6C1",
"#D64D3C",
"#5E2A42",
"#F8BBD0"
    ]

//GLOCAL VARIABLE OF MAP FEATURES
var FEATURES = []
var open_post = ""


async function loadGeoJSONFeatures(map) {
    const posts = document.querySelectorAll('.post');

    posts.forEach(async (post) => {
        const postId = post.id;
        const geojsonUrl = `/static/map/${postId}.geojson`;

        try {
            const response = await fetch(geojsonUrl);
            if (!response.ok) {
                console.warn(`Failed to fetch GeoJSON for post ${postId}`);
                return;
            }

            const geojsonData = await response.json();
            const featureGroup = L.featureGroup();

            // Style and add each feature to the featureGroup
            geojsonData.features.forEach((feature, featureIndex) => {
                const geometryType = feature.geometry.type;

                let layer;

                if (geometryType === "LineString" || geometryType === "MultiLineString") {
                    layer = L.geoJSON(feature, {
                        style: {
                            weight: 4,
                            opacity: 0.8,
                            color: COLORS[featureIndex % COLORS.length]
                        }
                    });
                } else {
                    const customIcon = L.icon({
                        iconUrl: '/static/icon.png',
                        iconSize: [100, 100],
                     
                    });

                    layer = L.geoJSON(feature, {
                        pointToLayer: (feature, latlng) => {
                            return L.marker(latlng, { icon: customIcon });
                        }
                    });
                }

                layer.eachLayer(l => {
                // tooltip for description if exists
                const description = feature.properties?.description;
                if (description) {
                    l.bindTooltip(description, {
                        direction: 'top',
                        offset: [0, -10],
                        sticky: true
                    });
                }

                // Click triggers corresponding input
                const inputElement = document.getElementById(`post${postId}input`);
                if (inputElement) {
                    l.on('click', () => {
                        inputElement.click();
                        handleLabelClick(inputElement);
                    });
                }
            });
                layer.addTo(featureGroup);
            });

            featureGroup.addTo(map);

            // Click on input triggers focusFeatureGroup
           const inputElement = document.getElementById(`post${postId}input`);
            if (inputElement) {
                inputElement.addEventListener('click', () => {
                    focusFeatureGroup(featureGroup);
                });
            }


        } catch (error) {
            console.error(`Error processing GeoJSON for post ${postId}:`, error);
        }
    });
}


loadGeoJSONFeatures(map);

/*

//increments through color options so each track is different
function styleLayer(elementNumber) {
    if (elementNumber) {
        return {
            color: COLORS[elementNumber % 8],
            weight: 3,
            opacity: 0.4,
            
        };
    } else {
        return {
            color:  "#ffab44",
            weight: 3,
            opacity: 0.4,
        }
    }
}

//INPUT: MARKER FILE LOCATIONS
//OUTPUT: LEAFLET LAYER
function fetchGeojsonMarker(fileLocation) {
    var icon = L.icon({
        iconUrl: "images/icon.png",
        iconSize: [100,100]
    })
    var geojsonLayer = new L.GeoJSON.AJAX(fileLocation, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: icon})
        }
    })
    return geojsonLayer
}

//INPUT: FILE LOCATIONS OF GEOJSON TRACKS
//OUTPUT: LEAFLET GROUP OF TRACKS
function fetchGeojsonTracks (fileLocations) {

    var group = new L.FeatureGroup
    for (var i = 0; i<fileLocations.length; i++) {
        var geojsonLayer = new L.GeoJSON.AJAX(fileLocations[i], {
            style: styleLayer(i+1) //add one to prevent division by zero in color styling
        }).bindTooltip(function (layer) {
            return layer.feature.properties.description
    }, {"sticky": true, "direction": "top"}).addTo(group); 
    };
    return group
};

//INPUT: HTML POST ELEMENT AND FEATURE COUNT
//OUTPUT: ARRAY OF FILE LOCATIONS
function aggregateFileLocations(post, featureCount) {

    var fileLocations = [] 
    for (var x = 0; x<Number(featureCount); x++) {
        fileLocations.push(`map/${post}/${x+1}.geojson`)
    }
    return fileLocations
}

//INPUT: LEAFLET LAYER OR GROUP
//OUTPUT: LEAFLET LAYER OR GROUP
function addMapFeature (feature) {
    feature.addTo(map)
    FEATURES.unshift(feature)
    return feature
}
        
function iteratePosts (posts) {
    for (var i = 0; i<posts.length; i++) { //ITERATE THROUGH EACH POST
        var currentPost = posts[i]
        var featureCount = currentPost.dataset.featureCount

        if (featureCount == 0) { //CONDITION FOR MARKER
            var layer = fetchGeojsonMarker(`map/${currentPost.id}/1.geojson`, `map/${currentPost.id}/icon.png`)
            addMapFeature(layer)
        } else {  //CONDITION FOR TRACK(S)
            var fileLocations = aggregateFileLocations(currentPost.id, featureCount)
            var group = fetchGeojsonTracks(fileLocations)
            addMapFeature(group)
        };
    }
}

var posts = document.getElementsByClassName('post')
iteratePosts(posts)




function openPost(e) {
    if (e == open_post) {
        return
    } else {
        open_post = e
        function focus(feature) {
            feature.eachLayer(function (layer) {
                try {
                    layer.setStyle({
                            opacity: 1,
                            weight: 5
                        })
                    
                } catch (error) {
                    layer.setOpacity(1)
                }
            })
        }
            
        
        function unfocus(feature) {
            feature.eachLayer(function (layer) {
                try {
                    layer.setStyle({
                            opacity: 0.2,
                            weight: 5
                        })
                    
                } catch (error) {
                    layer.setOpacity(0)
                }
            })
        }
        function panOver(feature) {
            var bounds = feature.getBounds()
            map.flyToBounds(bounds, {paddingBottomRight: [document.getElementById('blog-container').offsetWidth, 0], duration: 1.5, easeLinearity: 0.2, maxZoom: 9})
            //map.flyTo([center.lat, center.lng + 1.5], 8 )

        }
        //unfocus all features
        FEATURES.forEach(unfocus)

        var currentPost = FEATURES[e-1]
        
        panOver(currentPost)
        setTimeout(() => {
            focus(currentPost);
        }, 1500)
    }
}

*/