var mapmuse = new L.Map('mapid').setView([50.240, 10], 5);

var base = L.tileLayer("https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapmuse);

//overlay control
var overlays;

var myLayersControl = L.control.layers(null, overlays).addTo(mapmuse);

