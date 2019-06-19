// queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });

  function createFeatures(earthquakeData) {

    var latitude = [];
    var longitude = [];
    var allMagnitude = [];
    var allLocation = [];
    var allTime = [];

    var markers = [];

    for (var i=0; i<earthquakeData.length; i++) {
    var magnitude = earthquakeData[i]["properties"]["mag"];
    var location = earthquakeData[i]["properties"]["place"];
    var time = earthquakeData[i]["properties"]["time"];
    

        if (magnitude < 1) {
        markers.push(
            L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]], 
            {fillColor: "green",
            stroke: false,
            fillOpacity: 0.5,
            radius: (magnitude * 50) + 20000})
            .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
            );
    }

        else if (magnitude >=1 && magnitude < 2) {
        markers.push(
            L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
            {fillColor: "lightgreen",
            stroke: false,
            fillOpacity: 0.5,
            radius: (magnitude * 50) + 40000})
            .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
        );
    }

        else if (magnitude >=2 && magnitude < 3) {
        markers.push(
            L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
            {fillColor: "yellow",
            stroke: false,
            fillOpacity: 0.5,
            radius: (magnitude * 50) + 60000})
            .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
        );
    }

        else if (magnitude >=3 && magnitude < 4) {
            markers.push(
            L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]], 
            {fillColor: "orange",
            stroke: false,
            fillOpacity: 0.5,
            radius: (magnitude * 30) + 80000})
            .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
        );
    }

        else if (magnitude >=4 && magnitude < 5) {
        markers.push(
        L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "darkorange",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 100000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }

        else if (magnitude >=5) {
            markers.push(
            L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
            {fillColor: "red",
            stroke: false,
            fillOpacity: 0.5,
            radius: (magnitude * 50) + 120000})
            .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
        );
    }
  }
  
    var earthquakes = L.layerGroup(markers);

 // Define a baseMaps object to hold our base layers
 var baseMaps = {
    "Satellite": satellitemap
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
    Earthquakes: earthquakes
};

var myMap = L.map("map", {
  center: [44.270000, 123.989990],
  zoom: 4,
  layers: [satellitemap, earthquakes]
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control
    .layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);