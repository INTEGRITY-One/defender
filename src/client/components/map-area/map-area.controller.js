'use strict';

angular.module('defenderApp')
  .controller('MapAreaCtrl', function ($scope, $http) {
    //this file configures the MapBox map to be displayed on client

    console.log('map.html: Attempting to load the map...');
    // Initialize the map
    var map;
    var pane;

    // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1IjoiZWhvbGxpbmdzd29ydGgiLCJhIjoiYmExYTk3MGYxOTJiYzVmNjAxM2E2YTI3NmU3NTM3YTIifQ.sV3ISTtVIipf3i9pvAYy8Q';
    // Create a map in the div #map
    map = L.mapbox.map('map', 'mapbox.light').setView([37.78, -92.85], 2); // World Map
    // Include handy Geosearch control
    var searchControl = new L.mapbox.geocoderControl('mapbox.places').addTo(map);

    var foodIcon = L.icon({
      iconUrl: 'assets/images/food.png',
      iconSize: [30, 30]
    });


     /*var results = new L.mapbox.LayerGroup().addTo(map);
     searchControl.on('found', function(data){
     results.clearLayers();
     for (var i = data.results.length - 1; i >= 0; i--) {
       results.addLayer(L.marker(data.results[i].latlng));
     }
     });*/
    var geocoder = L.mapbox.geocoder('mapbox.places');
    geocoder.query('Washington, DC', showMap);

    function showMap(err, data) {
      // The geocoder can return an area, like a city, or a
      // point, like an address. Here we handle both cases,
      // by fitting the map bounds to an area or zooming to a point.
      /*if (data.lbounds) {
        map.fitBounds(data.lbounds);
      } else if (data.latlng) {*/
        map.setView([data.latlng[0], data.latlng[1]], 4);

      //}
    }
    L.marker([37.78, -92.85], {icon: foodIcon}).addTo(map);
    var geocodeUrl = "http://api.tiles.mapbox.com/v4/geocode/mapbox.places/1600+pennsylvania+ave+nw.json?access_token=pk.eyJ1IjoiZWhvbGxpbmdzd29ydGgiLCJhIjoiYmExYTk3MGYxOTJiYzVmNjAxM2E2YTI3NmU3NTM3YTIifQ.sV3ISTtVIipf3i9pvAYy8Q";

    // Pane for showing relevant data
    /*var info = L.control({position: 'topright'});
     info.onAdd = function (map) {
     pane = L.DomUtil.create('div', 'info update-pane'); // create a div with a class "info"
     pane.innerHTML += 'No State Selected'; // Initial text
     return pane;
     };
     info.addTo(map);
     $('.update-pane').hide();*/



    console.log('map.html: Successfully loaded map!');

    /*$scope.processor = function(rawData, input, output) {
     var geojsonFeatureCollection = {
     type: 'FeatureCollection',
     features: []
     };

     var data = angular.fromJson(rawData);
     console.log('map.controller: Count is: ' + data.length);

     var stateValues = [];
     for(var i = 0; i < data.length; i++) {
     if(stateValues[data[i][input]] === undefined)
     stateValues[data[i][input]] = 0;
     stateValues[data[i][input]] += data[i][output];
     }
     console.log('map.controller: stateValues=' + stateValues);

     for (var i = data.length - 1; i >= 0; i--) {
     var curState = data[i][input];
     var curStateValue = stateValues[data[i][input]];
     console.log('map.controller: ' + curState + ' -- ' + curStateValue);

     // Augment existing State feature with info. needed for "heatmap"
     $scope.cropLayerGroup.clearLayers(); // "Resets" the map before displaying new crop data
     states.find()
     .layers('2')
     .text(curState)
     .run(function(error, featureCollection) {
     for(var i = 0; i < featureCollection.features.length; i++) {
     for(var j = 0; j < data.length; j++) {
     if(featureCollection.features[i].properties.STATE_NAME.toUpperCase() === data[j][input].toUpperCase()) {
     stateValues = [];
     for(var k = 0; k < data.length; k++) {
     if(stateValues[data[k][input]] === undefined)
     stateValues[data[k][input]] = 0;
     stateValues[data[k][input]] += data[k][output];
     }
     curStateValue = stateValues[data[j][input]];

     // Add the layers to the cropLayerGroup, so they can be controlled as a unit
     $scope.cropLayerGroup.addLayer(new L.GeoJSON(featureCollection.features[i], {
     style: style(curStateValue, 0), //maxCropDataValue
     onEachFeature: $scope.onEachFeature
     }));
     }
     }
     }
     });
     // Add the assembled LayerGroup to the map all at once
     $scope.cropLayerGroup.addTo(map);
     }*/
    //on error
    $scope.errorHappenedMapArea = false;
  }
);
