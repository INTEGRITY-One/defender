'use strict';

angular.module('defenderApp')
  .controller('MapAreaCtrl', function ($scope, $http) {
    //this file configures the MapBox map to be displayed on client
    // Initialize some variables
    var map;
    $scope.currResults = []; // Resultset from module
    var features = new L.mapbox.FeatureLayer();

    var markers = [];
    // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1IjoiZWhvbGxpbmdzd29ydGgiLCJhIjoiYmExYTk3MGYxOTJiYzVmNjAxM2E2YTI3NmU3NTM3YTIifQ.sV3ISTtVIipf3i9pvAYy8Q';
    var geocoder = L.mapbox.geocoder('mapbox.places');

    // Custom icon for Food recalls
    var foodIcon = L.icon({
      iconUrl: 'assets/images/food_orange.png',
      iconSize: [30, 30]
    });

    // Create a map in the div #map
    var initMap = function () {
      console.log('map.html: Attempting to load the map...');
      map = L.mapbox.map('map', 'mapbox.light').setView([37.78, -92.85], 1); // World Map

      // Looks for data updates from component scope
      window.setInterval(function () {
        if (defender.currentResults !== undefined) {
          if (defender.currentResults !== $scope.currResults) {
            console.log('found new results: ' + defender.currentResults);
            $scope.currResults = defender.currentResults;
            //$scope.affectedStates = defender.affectedStates;
            //$scope.affectedCountries = defender.affectedForeignCountries;

            // Update the map with new data
            $scope.updateFeatures($scope.currResults);
            //$scope.updateAffectedAreas($scope.affectedStates, $scope.affectedCountries);
            console.log('map.html: Successfully updated map!');
          }
        }
      }, 1000); // ...every second
    };

    $scope.updateFeatures = function (results) {
      clearMap();

      // Geocode the City, ST of the results to build up the FeatureLayer
      var cities = [];
      for (var i = ($scope.currResults).length - 1; i >= 0; i--) {
        // De-duplication
        if (cities.indexOf($scope.currResults[i].city + ", " + $scope.currResults[i].state) === -1) {
          geocoder.query($scope.currResults[i].city + ", " + $scope.currResults[i].state, addToLayer);
          cities.push($scope.currResults[i].city + ", " + $scope.currResults[i].state);
        }
      }

      features = L.featureGroup(markers)
        .bindPopup('Hello world!');

      features.on('ready', function () {
        // featureLayer.getBounds() returns the corners of the furthest-out markers,
        // and map.fitBounds() makes sure that the map contains these.
        features.addTo(map);
        map.fitBounds(features.getBounds());
      });

    };

    // Clear the map
    function clearMap() {
      // Handle case where map does not yet have Layers
      if (map.layers !== undefined)
        /*for (var i = 0; i < map.layers.length; i++) {
          map.removeLayer(map.layers[i]);
        }*/
        map.removeLayer(features);

      // Clear markers more elegantly here!
      markers = [];
    }


    // Function for building up the FeatureLayer
    function addToLayer(err, data) {

      var marker = L.marker(data.latlng, {
       icon: foodIcon,
       properties: {
       title: data
       }
      });
      marker.bindPopup('Hello world!');
      markers.push(marker);


      /*features.on('ready', function(layer) {

        // here you call `bindPopup` with a string of HTML you create - the feature
        // properties declared above are available under `layer.feature.properties`
        var content = '<h2>A ferry ride!<\/h2>' +
          '<p>From: ' + layer.feature.properties.from + '<br \/>' +
          'to: ' + layer.feature.properties.to + '<\/p>';
        layer.bindPopup(content);
      });*/

      // Finally, all the completed FeatureLayer to the map
      //features.addTo(map);

     /* L.marker(data.latlng, {
        icon: foodIcon,
        properties: {
          title: 'Hello world!'
        }
      }).on('mouseover', function(e) {
        e.layer.openPopup();
      }).on('mouseout', function(e) {
        e.layer.closePopup();
      }).addTo(features);*/


    };
    


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
