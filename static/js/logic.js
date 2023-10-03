// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    console.log(data)
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});
function chooseColor(depth) {
    if (depth > 90)
    return "red";
    else if (depth >70)
    return "OrangeRed";
    else if (depth > 50)
    return "Orange";
    else if (depth > 30)
    return "Yellow";
    else if (depth > 10)
    return "YellowGreen";
    else 
    return "Green"    
    }


function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h3>Depth:${feature.geometry.coordinates[2]}</h3><hr><p>Magnitude:${(feature.properties.mag)}</p>`);
  }

  //Create a GeoJSON layer that contains the features array on the earthquakeData object.
  //Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, lat_long) {
        return new L.circle(lat_long, {
            radius: (feature.properties.mag)*25000,
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            color: "White",
            opacity: .5,
            fillOpacity: .75,
            stroke: true,
            weight: .5
        })
    },
    onEachFeature: onEachFeature
  });

  
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

