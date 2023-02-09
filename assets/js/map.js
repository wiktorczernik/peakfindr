// Required data
const api = 'pk.eyJ1IjoicG9seWJybyIsImEiOiJjbGR2ZjFkZDEwMTI0NDFvOTNhdG1kNXNrIn0.Lr-Ktl6lKhOfCJli4aqv3Q';
const mapSource = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const mapStyle = 'mapbox/satellite-v9'
const imagesPath = '../assets/img/map/mountains/'
const mapTileSize = 512

//Options
const initZoom = 4;
const maxZoom = 8;
const minZoom = 3;
const defaultCenter = [0,0];
const maxBounds = L.latLngBounds(L.latLng(-62.5, -170.0), L.latLng(90.0, 191.5));
const maxBoundsViscosity = 1.0;
const dobuleClickZoom = false;
const attributionControl = false;
const zoomAnimation = false;
const markerZoomAnimation = false;
const fadeAnimation = false;
const zoomControl = false;


var peakMap;
const peakIcon = L.icon({
    iconUrl: '../assets/img/map/peak-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -12],
    shadowUrl: '../assets/img/map/peak-icon-shadow.png',
    shadowSize: [34, 34],
    shadowAnchor: [17, 17]
});
const peaksData = [
    {
        name: "Gunnbjorn Fjeld",
        cords: [68.9167, -29.7833],
        elevation: "3,694 m (12,119 ft)",
        location: "Greenland",
        range: "Watkings Range",
        firstAscent: "1935",
        image: "gunnbjorn.jpg"
    },
    {
        name: "Aconcagua",
        cords: [-32.6532, -70.0109],
        elevation: "6,960 m (22,837 ft)",
        location: "Argentina",
        range: "Andes",
        firstAscent: "1897",
        image: "aconcagua.jpg"
    },
    {
        name: "Mount Logan",
        cords: [60.5670, -140.4053],
        elevation: "5,959 m (19,551 ft)",
        location: "Canada",
        range: "Saint Elias Mountains",
        firstAscent: "1925",
        image: "loganpaul.jpg"
    },
    {
        name: "Denali",
        cords: [63.0692, -151.0070],
        elevation: "6,190 m (20,310 ft)",
        location: "United States of America",
        range: "Alaska Range, Cordillera",
        firstAscent: "1913",
        image: "denali.jpg"
    },
    {
        name: "Puncak Jaya",
        cords: [-4.0846, 137.1866],
        elevation: "4,884 m (16,024 ft)",
        location: "Indonesia",
        range: "Sudirman Range",
        firstAscent: "1962",
        image: "puncakjaya.jpg"
    },
    {
        name: "Mawson Peak",
        cords: [-53.1032, 73.5161],
        elevation: "2,745 m (9,006 ft)",
        location: "Australia",
        range: "Big Ben",
        firstAscent: "1965",
        image: "meowson.jpg"
    },
    {
        name: "Maromokotro",
        cords: [-14.0208, 48.9667],
        elevation: "2,876 m (9,436 ft)",
        location: "Madagascar",
        range: "None",
        firstAscent: "1936",
        image: "maromokotro.jpg"
    },
    {
        name: "Mount Kilimanjaro",
        cords: [-3.0674, 37.3556],
        elevation: "5,895 m (19,340 ft)",
        location: "Tanzania",
        range: "Eastern Rift",
        firstAscent: "1889",
        image: "kilimanjaro.jpg"
    },
    {
        name: "Klyuchevskaya Sopka",
        cords: [56.0575, 160.6415],
        elevation: "4,754 m (15,597 ft)",
        location: "russia",
        range: "Eastern Range",
        firstAscent: "1788",
        image: "sopka.jpg"
    },
    {
        name: "Mount Teide",
        cords: [28.2723, -16.6425],
        elevation: "3,718 m (12,198 ft)",
        location: "Spain",
        range: "Volcano",
        firstAscent: "1582",
        image: "teide.jpg"
    },
    {
        name: "Mont Blanc",
        cords: [45.8326, 6.8652],
        elevation: "4,807 m (6,762 ft)",
        location: "France",
        range: "Alps",
        firstAscent: "1786",
        image: "montblanc.jpg"
    },
    {
        name: "Hoverla",
        cords: [48.1602, 24.5000],
        elevation: "2,061 m (6,762 ft)",
        location: "Ukraine",
        range: "Karpatys",
        firstAscent: "Unknown",
        image: "hoverla.jpg"
    },
    {
        name: "Zugspitze",
        cords: [47.4211, 10.9854],
        elevation: "2,962 m (9,718 ft)",
        location: "Germany",
        range: "Alps, Wetterstein",
        firstAscent: "1820",
        image: "zugspitze.jpg"
    },
    {
        name: "Mount Elbrus",
        cords: [43.3499, 42.4453],
        elevation: "5,642 m (18,510 ft)",
        location: "Georgia",
        range: "Caucasus, Lateral",
        firstAscent: "1829",
        image: "mtelbrus.jpg"
    },
    {
        name: "Mount Everest",
        cords: [27.9881, 86.9250],
        elevation: "8,848 m (29,031 ft)",
        location: "Nepal",
        range: "Himalayas, Mahalangur Himal",
        firstAscent: "1953",
        image: "everest.jpg"
    },
    {
        name: "K2 Mountain",
        cords: [35.8800, 76.5151],
        elevation: "8,611 m (28,251 ft)",
        location: "Pakistan, China",
        range: "Himalayas, Karakoram",
        firstAscent: "1954",
        image: "k2.jpg"
    },
    {
        name: "Kangchenjunga",
        cords: [27.702414, 88.147881],
        elevation: "8,611 m (28,169 ft)",
        location: "Nepal, India, Bhuan, China",
        range: "Himalayas",
        firstAscent: "1955",
        image: "kangchenjunga.jpg"
    },
    {
        name: "Lhotse",
        cords: [27.9626, 87.1336],
        elevation: "8,516 m (27,940 ft)",
        location: "Nepal, Tibet",
        range: "Himalayas, Mahalangur Himal",
        firstAscent: "1956",
        image: "lhotse.jpg"
    },
    {
        name: "Makalu",
        cords: [27.8857, 87.0876],
        elevation: "8,481 m (27,825 ft)",
        location: "Nepal, Tibet",
        range: "Himalayas, Mahalangur Himal",
        firstAscent: "1955",
        image: "makalu.jpg"
    },
    {
        name: "Cho Oyu",
        cords: [28.0960, 86.6615],
        elevation: "8,188 m (26,864 ft)",
        location: "Nepal, Tibet",
        range: "Himalayas, Mahalangur Himal",
        firstAscent: "1954",
        image: "chooyu.jpg"
    },
    {
        name: "Dhaulagiri I",
        cords: [28.6985, 83.4873],
        elevation: "8,167 m (26,795 ft)",
        location: "Nepal",
        range: "Himalayas, Mahalangur Himal",
        firstAscent: "1960",
        image: "dhaulagiri.jpg"
    },
    {
        name: "Manaslu",
        cords: [28.5497, 84.5597],
        elevation: "8,163 m (26,781 ft)",
        location: "Nepal",
        range: "Himalayas, Mahalangur Himal",
        firstAscent: "1956",
        image: "manaslu.jpg"
    },
    {
        name: "Rysy",
        cords: [49.1795, 20.0881],
        elevation: "2,501 m (8,205 ft)",
        location: "Poland, Slovakia",
        range: "High Tatras",
        firstAscent: "1840",
        image: "rysy.jpeg"
    }
]


window.onload = initmap;

function initmap(){
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

    L.tileLayer(mapSource, {
        id: mapStyle,
        tileSize: mapTileSize,
        zoomOffset: -1,
        accessToken: api
    }).addTo(peakMap);

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
function markerClick(e){
    let latLng = e.latlng;
    peakMap.setZoom(maxZoom);
    peakMap.setView(latLng);
}