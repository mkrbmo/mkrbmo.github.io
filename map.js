var map = L.map('map').setView([47.624248, -122.317024], 10);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    tiles:"CartoDB.Voyager"
}).addTo(map);


function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
var geojson
const COLORS = [
    "#d9f0a3",
    "#addd8e",
    "#78c679",
    "#41ab5d",
    "#238443",
    "#006837",
    "#004529"]
var i = -1
function style() {
    i++
    return {
        color: COLORS[i],
        weight: 4,
        opacity: 4,
    };
}
function addTrackToMap(geojson) {
    var layer = L.geoJSON(geojson,
        {
            style: style
        }).addTo(map);
    return layer
}
async function fetchTrack(file) {
    var track 
    try {
        await fetch(file)
            .then((response) => response.json())
            .then((json) => {
                track = addTrackToMap(json);
                
                
            }); 
    } catch (error) {
        console.log(error)
    }
    return track
}

function addMouseover (track) {
    track.on('mouseover', function(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 6
        });
        layer.bringToFront()
    });
    track.on('mouseout', function(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 4
        });
    })
    track.on('click', function(e) {
        zoomToFeature(e)
    })
}
function addListEntry(track) {

}


fetchTrack('./tracks.geojson').then((track) => addMouseover(track))

fetchTrack('./back.geojson').then(track => addMouseover(track))

