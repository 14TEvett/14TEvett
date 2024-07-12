var map = L.map('map').setView([51.574349, -1.310892], 17);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.attributionControl.addAttribution('<a href="https://www.diamond.ac.uk">Diamond Light Source</a>');

const lowerBoundary = [51.57168183170403, -1.3173294067382815];
const upperBoundary = [51.57701619673675, -1.304454803466797];
var imageBounds = [lowerBoundary,upperBoundary];

var imageUrl = "BaseUnder.png";
L.imageOverlay(imageUrl, imageBounds,{zindex: 1}).addTo(map);

var imageUrl = "BaseOver.png";
L.imageOverlay(imageUrl, imageBounds,{zindex: 2}).addTo(map);
var greenIcon = new L.Icon({
    iconUrl: 'diamond_light_source_image.png',
    iconSize: [204.4, 60],
    iconAnchor: [102.2, 30],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
var marker = L.marker([51.574349, -1.310892], {icon: greenIcon}).addTo(map);

//var marker = L.marker([51.574349, -1.310892]).addTo(map);
// marker.bindPopup("<b>Hello world</b><br>I am a popup.")
// map.on('click', function(ev) {
//     alert(ev.latlng); // ev is an event object (MouseEvent in this case)
// });
map.locate({watch: true})
var circle = L.circle([51.574349, -1.310892], {radius: 10, color: '#fbd40c'}).addTo(map);
var circle2 = L.circle([51.574349, -1.310892], {radius: 4, color: '#242d64'}).addTo(map);
// var circle3 = L.circle([51.574349, -1.310892], {radius: 4, color: '#242d64'}).addTo(map); 
var loc = [51.574349, -1.310892];
var distancesArray = [];
var markersArray = [];
map.on('locationfound', function(ev) {
    loc = ev.latlng;
    circle.setLatLng(ev.latlng);
    circle.setRadius(ev.accuracy);
    circle2.setLatLng(ev.latlng);
    


})
fetch("beamlines_data.json").then((result) => result.json()).then((groups) => {
    var overlays = {};
    for (var group of groups) {
        let lg = L.layerGroup()
        var icon = new L.icon({
            iconUrl: group.marker,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        for (var beamline of group.beamlines) {
            // console.log(beamline.name)
            // console.log(beamline.position)
            var position = beamline.position
            var link = `<a href=${beamline.url}>${beamline.url}</a>`
            var marker = L.marker(position, {icon: icon}).addTo(lg);
            markersArray.push(marker)
            marker.bindPopup(`<b>${beamline.name}</b><br>${group.name}<br>${beamline.description}<br>${link}`)
            
        }

        overlays[group.name] = lg
        lg.addTo(map)
    }
    L.control.layers(null,overlays).addTo(map)
})

var controlButton = L.control({position: "topright"});
controlButton.onAdd = function () {
    var div = L.DomUtil.create('div');
    div.innerHTML = '<button>Find nearest beamline</button>';
    div.firstChild.addEventListener("click", function(ev) {
        L.DomEvent.stopPropagation(ev);
        var checkingDistance = Number.MAX_SAFE_INTEGER
        console.log(distancesArray)
        for (var marker of markersArray) {
            var markerPosition = marker.getLatLng();
            var distance = markerPosition.distanceTo(loc)
            if(distance<checkingDistance) {
                checkingDistance = distance
                var closestMarker = marker
            } 
        }
        var pop = closestMarker.getPopup();
        var popupContent = pop.getContent();
        console.log(popupContent)
        closestMarker.setPopupContent('<b>Nearest beamline</b>')
        closestMarker.openPopup();
        closestMarker.on('popupclose', function(ev) {
            closestMarker.setPopupContent(popupContent)
        })
        


    }); 
    return div


};
controlButton.addTo(map);
