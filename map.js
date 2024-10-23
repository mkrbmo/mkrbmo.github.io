// INSTANTIATE MAP //
var map = L.map('map').setView([47.624248, -122.317024], 9);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    tiles:"CartoDB.Voyager"
}).addTo(map);

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

var routes2024 = new L.FeatureGroup()

// MAP VIEWING FUNCTIONS //


function styleLayer() {
    i++
    return {
        color: COLORS[i % 8],
        weight: 5,
        opacity: 10,
    };
}
function addLayerToGroup(geojson) {
    var layer = L.geoJSON(geojson,
        {
            style: styleLayer
        })
    routes2024.addLayer(layer)
    return layer
}
async function fetchTrackDataFromFile(file) {
    var track 
    try {
        await fetch(file)
            .then((response) => response.json())
            .then((json) => {
                track = addLayerToGroup(json);
            }); 
    } catch (error) {
        console.log(error)
    }
    return track
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
    fetchTrackDataFromFile(`map/${i}.geojson`).then((track) => addInteraction(track))
}

map.addLayer(routes2024)
var overlayMaps = {
    "2024": routes2024
};
var layerControl = L.control.layers(null, overlayMaps).addTo(map);



