// Required data
const api = 'pk.eyJ1IjoicG9seWJybyIsImEiOiJjbGR2ZjFkZDEwMTI0NDFvOTNhdG1kNXNrIn0.Lr-Ktl6lKhOfCJli4aqv3Q';
const mapSource = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const mapStyle = 'mapbox/satellite-v9'
const mapTileSize = 512

//Options
const initZoom = 2;
const maxZoom = 10;
const minZoom = 2;
const defaultCenter = [0,0];
const maxBounds = L.latLngBounds(L.latLng(-62.5, -170.0), L.latLng(90.0, 191.5));
const maxBoundsViscosity = 1.0;
const dobuleClickZoom = false;
const attributionControl = false;


const peakIcon = L.icon({
    iconUrl: '../assets/img/map/peak-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -12],
});
const exampleMarker = L.marker([49.1795, 20.0881], {
    icon: peakIcon
});

var peakMap;
var peaksData;

window.onload = initmap;

function initmap(){
    peakMap = L.map("map", {
        center: defaultCenter,
        zoom: initZoom,
        maxZoom: maxZoom,
        minZoom: minZoom,
        maxBounds: maxBounds,
        maxBoundsViscosity: maxBoundsViscosity,
        doubleClickZoom: dobuleClickZoom,
        attributionControl: attributionControl
    });
    
    /*
    fetch('../assets/definition/peaks.json')
    .then((response) => response.json())
    .then((json) => peaksData = json)
    */

    L.tileLayer(mapSource, {
        id: mapStyle,
        tileSize: mapTileSize,
        zoomOffset: -1,
        accessToken: api
    }).addTo(peakMap);

    exampleMarker.addTo(peakMap);
    exampleMarker.bindPopup('<h1>Rysy</h1><p>Elevation: 2,501 m (8,205 ft)<br>Location: Poland, Slovakia<br>First ascent: 1840</p><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rysy%2C_wierzcholek_slowacki.jpg/1280px-Rysy%2C_wierzcholek_slowacki.jpg" width="150px">', );
    exampleMarker.on('click', markerClick);
}

function markerClick(e){
    let latLng = e.latlng;
    peakMap.setZoom(maxZoom);
    peakMap.setView(latLng);
}