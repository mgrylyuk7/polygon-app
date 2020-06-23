// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("channels")


// Import CSS from Leaflet and plugins.
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.markercluster/dist/MarkerCluster.css';
// import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Import images directly that got missed via the CSS imports above.
// import 'leaflet/dist/images/marker-icon-2x.png';
// import 'leaflet/dist/images/marker-shadow.png';

// Import JS from Leaflet and plugins.
// import 'leaflet/dist/leaflet';
// import 'leaflet.markercluster/dist/leaflet.markercluster';
// import 'leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant';

// import 'leaflet';
// const L = window['L'];
import L from 'leaflet';
import leafletDraw from 'leaflet-draw';

// var mymap = L.map('mapid', {drawControl: true}).setView([51.505, -0.09], 13);
//
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'sk.eyJ1IjoibWdyeWx5dWsiLCJhIjoiY2tia3MzazE4MTF4djMwcGptM3Z1bXgyZiJ9.2yii1Gx8OmBtVaMGjvKzvA'
// }).addTo(mymap);






// var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
// // FeatureGroup is to store editable layers
// var drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);
// var drawControl = new L.Control.Draw({
//   edit: {
//     featureGroup: drawnItems
//   }
// });
// map.addControl(drawControl);


var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
  map = new L.Map('map', { center: new L.LatLng(51.505, -0.04), zoom: 13 }),
  drawnItems = L.featureGroup().addTo(map);
L.control.layers({
  'osm': osm.addTo(map),
  "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    attribution: 'google'
  })
}, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
map.addControl(new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
    poly: {
      allowIntersection: false
    }
  },
  draw: {
    polygon: {
      allowIntersection: false,
      showArea: true
    }
  }
}));

fetch('/polygon_coordinations')
  .then(response => response.json())
  .then(data => data.map(obj => obj.area))
  .then(coordinates => coordinates.map(coordinate => L.polygon(coordinate)) )
  .then(polygons => { polygons.forEach(layer => drawnItems.addLayer(layer)) })

map.on(L.Draw.Event.CREATED, function (event) {
  var layer = event.layer;
  // debugger
  drawnItems.addLayer(layer);

  fetch("/polygon_coordinations", {
    method: "post",
    body: JSON.stringify({polygon_coordinate: { area: event.layer._latlngs[0].map(obj => [obj.lat, obj.lng]) }}),
    headers: {
      'Content-Type': 'application/json',
      // 'X-CSRF-Token': Rails.csrfToken()
    },
    credentials: 'same-origin'
  }).then(res => res.json())
    .then(data => drawnItems.addLayer(L.polygon(data.area)) );
});
