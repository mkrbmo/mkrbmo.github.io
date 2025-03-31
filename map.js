// INSTANTIATE MAP 
// set map style
var map = L.map('map').setView([47.624248, -122.317024], 9);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    tiles:"CartoDB.Voyager",
    paddingBottomRight: [document.getElementById('blog-container').offsetWidth, 0],
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

//global store of map features
var FEATURES = []

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
function fetchGeojsonTrack(fileLocation) {
    

}
//takes: geojson file locations array 
// styles features
// returns: feature or feature group
function addMapFeature (features, icon) {

    if (icon) {
        var marker = new L.marker
        marker.bindToolTip('test')
        return marker
    }
    var group = new L.FeatureGroup
    for (var i = 0; i<features.length; i++) {
        var geojsonLayer = new L.GeoJSON.AJAX(features[i], {
            style: styleLayer(i+1) //add one to prevent division by zero in color styling
        }).addTo(group); 
    };
    return group
};


var posts = document.getElementsByClassName('post')
for (var i = 0; i<posts.length; i++) { //ITERATE THROUGH EACH POST
    var currentPost = posts[i]
    var featureCount = currentPost.dataset.featureCount
    
    //CONDITION FOR MARKER
    if (featureCount == 0) {
        var icon = L.icon({
            iconUrl: `map/${currentPost.id}/icon.png`
        })
    
    //CONDITION FOR TRACK(S)
    } else {
        //loop through number of features
        var fileLocations = [] 
        for (var x = 0; x<Number(featureCount); x++) {
            fileLocations.push(`map/${currentPost.id}/${x+1}.geojson`)
        }

    }
    //add feature/feature group to map and features array
    FEATURES.unshift(addMapFeature(fileLocations).addTo(map))
    }



function openPost(e) {
    function focus(feature) {
        feature.setStyle({
            opacity: 1,
            weight: 5
        })
    }
    function unfocus(feature) {
        feature.setStyle({
            opacity: 0,
            weight: 3
        })
    }
    function panOver(feature) {
        var bounds = currentPost.getBounds()
        map.flyToBounds(bounds, {paddingBottomRight: [document.getElementById('blog-container').offsetWidth, 0], duration: 2, easeLinearity: 0.2})
        //map.flyTo([center.lat, center.lng + 1.5], 8 )

    }
    //unfocus all features
    FEATURES.forEach(unfocus)

    var currentPost = FEATURES[e-1]
    
    panOver(currentPost)
    setTimeout(() => {
        focus(currentPost);
    }, 2000)
    
}


//testing purposes only
map.on("click", function(e) {
    console.log(map.getZoom())
    console.log(map.getBounds().getWest()-map.getBounds().getEast())
    //console.log(e.latlng.lng - map.getBounds().getCenter().lng)
})
