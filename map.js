// INSTANTIATE MAP //
var map = L.map('map').setView([47.624248, -122.317024], 9);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    
    tiles:"CartoDB.Voyager"
}).addTo(map);
map.zoomControl.setPosition('bottomleft')


var geojson
const COLORS = [
    "#d9f0a3",
    "#addd8e",
    "#78c679",
    "#41ab5d",
    "#238443",
    "#006837",
    "#004529"]
var i = 0

var routesGroup2024 = new L.FeatureGroup()

// MAP VIEWING FUNCTIONS //


function styleLayer() {
    i++ //increments through color options so each track is different
    return {
        color: COLORS[i % 8],
        weight: 5,
        opacity: 10,
    };
}

//creates leaflet layer from geojson and returns layer
function createLayerFromGeojson(geojson) {
    var layer = L.geoJSON(geojson,
        {
            style: styleLayer,
            onEachFeature: function (feature, layer) {
                if (feature.properties && feature.properties.popupContent) {
                    layer.bindPopup(feature.properties.popupContent);
                }
            }
        })
    routesGroup2024.addLayer(layer)
    return layer
}
async function fetchTrackDataFromFile(file) {
    try {
        await fetch(file)
            .then((response) => response.json())
            .then((json) => {
                return json
            }); 
    } catch (error) {
        console.log(error)
    }
}
function addInteraction (track) {
    let row = document.getElementById('track')
    track.on('mouseover', function(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 7
        });
        layer.bringToFront()
        
    });
    track.on('mouseout', function(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5
        });
    })
    track.on('click', function(e) {
        map.fitBounds(e.target.getBounds());
    });
    
}

for (let i = 0; i<14; i++) {
    fetchTrackDataFromFile(`map/${i}.geojson`).then((track) => createLayerFromGeojson(track)).then(function(layer){
        
        routesGroup2024.addLayer(layer);
        addInteraction(layer)
    })
}
console.log(routesGroup2024)
map.addLayer(routesGroup2024)
var overlayMaps = {
    "2024": routesGroup2024
};
var layerControl = L.control.layers(null, overlayMaps, {position: 'bottomright'}).addTo(map);
//layerControl.remove(map)


