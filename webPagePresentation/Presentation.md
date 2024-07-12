---

marp: true

---
# Building an interactive, informative web application
## *Thomas Evett & Vanshika Tummala*

---

# Development
## For our project we were tasked with making an interactive web program, this involved making a map of Diamond with markers and interactive features.

---

# Coding the map
## To start with, we had to use Leaflet 'an open-source Javascript library for mobile-friendly interactive maps'. This helped us code the base of our website.
![Leaflet_Map](screenshot.png)

---

# Coding the map cont.
## Using leaflet, we adjusted a map to Diamond's geographical location.
```javascript
var map = L.map('map').setView([51.574349, -1.310892], 17);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.attributionControl.addAttribution('<a href="https://www.diamond.ac.uk">Diamond Light Source</a>');
```
---

![startingDiamondMap](startingDiamondMap.png)




