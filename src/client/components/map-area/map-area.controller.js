'use strict';

angular.module('defenderApp')
  .controller('MapAreaCtrl', function ($scope, $http) {
    //this file configures the MapBox map to be displayed on client
    // Initialize some variables
    var map;
    $scope.currResults = []; // Resultset from module
    var features;// = new L.FeatureGroup();
    var areas;

    var markers = [];
    // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1IjoiZWhvbGxpbmdzd29ydGgiLCJhIjoiYmExYTk3MGYxOTJiYzVmNjAxM2E2YTI3NmU3NTM3YTIifQ.sV3ISTtVIipf3i9pvAYy8Q';
    var geocoder = L.mapbox.geocoder('mapbox.places');

    // Custom icon for Food recalls
    var foodIcon = L.icon({
      iconUrl: 'assets/images/food_orange.png',
      iconSize: [30, 30]
    });
    // Custom icon for Drug recalls
    var drugIcon = L.icon({
      iconUrl: 'assets/images/drug_blue.png',
      iconSize: [30, 30]
    });
    // Custom icon for Food recalls
    var devIcon = L.icon({
      iconUrl: 'assets/images/device_green.png',
      iconSize: [30, 30]
    });

    // Create a map in the div #map
    $scope.initMap = function () {
      console.log('map.html: Attempting to load the map...');
      map = L.mapbox.map('map', 'mapbox.light').setView([37.78, -92.85], 1); // World Map
      /*map.on("layeradd", function() {
        if (features !== undefined)
          map.fitBounds(features.getBounds());
      });*/

      // Looks for data updates from component scope
      window.setInterval(function () {
        if (defender.currentResults !== undefined) {
          if (defender.currentResults !== $scope.currResults) {
            console.log('found new results: ' + defender.currentResults);
            $scope.currResults = defender.currentResults;
            $scope.affectedStates = defender.affectedStates;
            $scope.affectedCountries = defender.affectedForeignCountries;

            // Update the map with new data
            $scope.updateAffectedAreas($scope.affectedStates, $scope.affectedCountries);
            $scope.updateFeatures($scope.currResults);
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
          console.log("trying to geocode this" + $scope.currResults[i].city + ", " + $scope.currResults[i].state);
          geocoder.query($scope.currResults[i].city + ", " + $scope.currResults[i].state, addCity);
          cities.push($scope.currResults[i].city + ", " + $scope.currResults[i].state);
        }
      }


      /*features = L.featureGroup(markers).on('ready', function () {
        console.log('map.html: markers length = ' + markers.length);
        // featureLayer.getBounds() returns the corners of the furthest-out markers,
        // and map.fitBounds() makes sure that the map contains these.
        console.log('map.html: features is ready!');
        //features.addTo(map);

      });*/

    };

    $scope.updateAffectedAreas = function (states, countries) {
      console.log('map.html: Affected states - ' + states);
      console.log('map.html: Affected countries = ' + countries);

      // Update the states
      for (var i = states.length - 1; i >= 0; i--) {
        var curState = states[i];
        var curStateValue = states[curState];
        console.log('map.controller: ' + curState + ' -- ' + curStateValue);

        // Geocode the ST, only if 1 or more are affected
        if (curStateValue > 0)
          geocoder.query(curState + ", United States", addArea);

        // Augment existing State feature with info. needed for "heatmap"
        /*$scope.cropLayerGroup.clearLayers(); // "Resets" the map before displaying new crop data
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
         $scope.cropLayerGroup.addTo(map);*/
      }
      // Update the countries
      for (var i = countries.length - 1; i >= 0; i--) {
        var curCountry = countries[i];
        var curCountryValue = countries[curCountry];
        console.log('map.controller: ' + curCountry + ' -- ' + curCountryValue);

        // Geocode the Country, only if 1 or more are affected
        if (curCountryValue > 0)
          geocoder.query(curCountry, addArea);


      }
    }
    // Clear the map
    function clearMap() {
      // Handle case where map does not yet have Layers
      if (map.layers !== undefined)
        for (var i = 0; i < map.layers.length; i++) {
          map.removeLayer(map.layers[i]);
        }
      console.log('map.html: Map cleared!');

      // Clear features and markers more elegantly here!
      markers = [];
      features = new L.FeatureGroup().addTo(map); // Re-initializes
      areas = new L.FeatureGroup().addTo(map);
    }


    // Function for building up the FeatureLayer
    function addCity(err, data) {
      // here you call `bindPopup` with a string of HTML you create - the feature
      // properties declared above are available under `layer.feature.properties`
      var content = data.results.query[0] + " was affected by " + $scope.affectedStates[data.results.query[0]] + " recalls";

      // Choose which icon to use
      var theIcon = foodIcon;
      /*if($('#selector-food').hasClass('selected'))
        theIcon = foodIcon;
      if($('#selector-drug').hasClass('selected'))
        theIcon = drugIcon;
      if($('#selector-device').hasClass('selected'))
        theIcon = devIcon;*/

      console.log('trying to create marker');
      L.marker(data.latlng, {
       icon: theIcon,
       properties: {
        title: data
       }
      }).bindPopup(content).addTo(features);
      map.fitBounds(features.getBounds());
    }

    function addArea(err, data) {
      // here you call `bindPopup` with a string of HTML you create - the feature
      // properties declared above are available under `layer.feature.properties`
      var content = data.results.query[0] + " was affected by " + $scope.affectedCountries[data.results.query[0]] + " recalls";

      L.circleMarker(data.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f22',
          'marker-symbol': 'circle-stroked'
        }),
        radius: $scope.affectedCountries[data.results.query[0]]*map.getZoom()
      }).bindPopup(content).addTo(areas);
      map.fitBounds(areas.getBounds());
    }

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
