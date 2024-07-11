var map = L.map('map').setView([51.574349, -1.310892], 17);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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

// var marker = L.marker([51.574349, -1.310892]).addTo(map);
marker.bindPopup("<b>Hello world</b><br>I am a popup.")
fetch("beamlines_data.json").then((result) => result.json()).then((groups) => {
    var overlays = {};
    for (var group of groups) {
        let lg = L.layerGroup()
        console.log(group)
        console.log(group.marker)
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
            marker.bindPopup(`<b>${beamline.name}</b><br>${group.name}<br>${beamline.description}<br>${link}`)

        }
        overlays[group.name] = lg
        lg.addTo(map)
    }
    L.control.layers(null,overlays).addTo(map)
})
