// Required data
const mapSource = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const imagesPath = '../assets/img/map/mountains/'

//Options
const initZoom = 4;
const maxZoom = 8;
const minZoom = 3;
const defaultCenter = [0,0];
const maxBounds = L.latLngBounds(L.latLng(-62.5, -170.0), L.latLng(90.0, 191.5));
const maxBoundsViscosity = 1.0;
const dobuleClickZoom = false;
const attributionControl = true;
const zoomAnimation = false;
const markerZoomAnimation = false;
const fadeAnimation = false;
const zoomControl = false;


var peakMap;
const peakIcon = L.icon({
    iconUrl: '/assets/img/map/peak-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -12],
    shadowUrl: '/assets/img/map/peak-icon-shadow.png',
    shadowSize: [34, 34],
    shadowAnchor: [17, 17]
});

const youIcon = L.icon({
    iconUrl: '/assets/img/map/you-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    shadowUrl: '/assets/img/map/you-icon-shadow.png',
    shadowSize: [34, 34],
    shadowAnchor: [17, 17]
});

let peaksData = [];


window.onload = (ev) => initmap();

async function initmap(){

    peaksData = await (await fetch("/assets/definitions/peaks.json")).json();

    L.Browser.any3d = false;
    peakMap = L.map("map", {
        center: defaultCenter,
        zoom: initZoom,
        maxZoom: maxZoom,
        minZoom: minZoom,
        maxBounds: maxBounds,
        maxBoundsViscosity: maxBoundsViscosity,
        doubleClickZoom: dobuleClickZoom,
        attributionControl: attributionControl,
        zoomAnimation: zoomAnimation,
        markerZoomAnimation : markerZoomAnimation,
        fadeAnimation: fadeAnimation,
        zoomControl: zoomControl
    });

    L.tileLayer(mapSource, {}).addTo(peakMap);

    viewToGeo();
    createMarkers();
}
function createMarkers(){
    peaksData.forEach(element => {
        let marker = L.marker(element.cords, {
            icon: peakIcon
        })
        let name = element.name;
        let elevation = element.elevation;
        let location = element.location;
        let ascent = element.firstAscent;
        let image = element.image;
        let range = element.range;
        marker.bindPopup('<h1>' + name + '</h1><p>Elevation: ' + elevation + '<br>Location: ' + location + '<br>Range: ' + range + '<br>First ascent: ' + ascent + '</p><img src="' + imagesPath + image + '" width="200px">');
        marker.on('click', markerClick);
        marker.addTo(peakMap);
    });
}
function viewToGeo(){
    navigator.geolocation.getCurrentPosition((e) => 
    {
        let crds = e.coords;
        let latLng = L.latLng(crds.latitude, crds.longitude)
        peakMap.setView(latLng)
        let youMarker = L.marker(latLng, {
            icon: youIcon
        });
        youMarker.addTo(peakMap);
    }, (e) => 
    {
        console.log("Czemu :-C");
    });
}
function markerClick(e){
    let latLng = e.latlng;
    peakMap.setZoom(maxZoom);
    peakMap.setView(latLng);
}