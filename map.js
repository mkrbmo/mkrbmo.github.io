// INSTANTIATE MAP //
var map = L.map('map').setView([47.624248, -122.317024], 9);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    tiles:"CartoDB.Voyager"
}).addTo(map);
map.zoomControl.setPosition('bottomleft')

//COLORS OPTIONS FOR MULTITRACK LAYERS
const COLORS = [
    "#d9f0a3",
    "#addd8e",
    "#78c679",
    "#41ab5d",
    "#238443",
    "#006837",
    "#004529"]

//increments through color options so each track is different
function styleLayer(elementNumber) {
    return {
        color: COLORS[elementNumber % 8],
        weight: 5,
        opacity: 0.4,
    };
}



var post4 = new L.FeatureGroup

for (var i = 1; i<14; i++) {
    var geojsonLayer = new L.GeoJSON.AJAX(`map/4/${i}.geojson`, {
        style: styleLayer(i)
    }).addTo(post4); 
    
};

post4.addTo(map);

