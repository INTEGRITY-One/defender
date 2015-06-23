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
          geocoder.query(curState + ", United States", addState);
      }
      // Update the countries
      for (var i = countries.length - 1; i >= 0; i--) {
        var curCountry = countries[i];
        var curCountryValue = countries[curCountry];
        console.log('map.controller: ' + curCountry + ' -- ' + curCountryValue);

        // Geocode the Country, only if 1 or more are affected
        if (curCountryValue > 0)
          geocoder.query(curCountry, addCountry);
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
      var theIcon = foodIcon; // default
      if($('#selector-food').hasClass('selected'))
        theIcon = foodIcon;
      if($('#selector-drug').hasClass('selected'))
        theIcon = drugIcon;
      if($('#selector-device').hasClass('selected'))
        theIcon = devIcon;

      L.marker(data.latlng, {
       icon: theIcon
      }).addTo(features);//.bindPopup(content);
      map.fitBounds(features.getBounds());
    }

    function addState(err, data) {
      // here you call `bindPopup` with a string of HTML you create - the feature
      // properties declared above are available under `layer.feature.properties`
      var content = data.results.query[0] + " was affected by " + $scope.affectedStates[data.results.query[0]] + " recalls";

      L.circleMarker(data.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f22',
          'marker-symbol': 'circle-stroked'
        }),
        radius: map.getZoom()/$scope.affectedStates[data.results.query[0]]
      }).bindPopup(content).addTo(areas);
      map.fitBounds(areas.getBounds());
    }
    $scope.errorHappenedMapArea = false;

    function addCountry(err, data) {
      // here you call `bindPopup` with a string of HTML you create - the feature
      // properties declared above are available under `layer.feature.properties`
      var content = data.results.query[0] + " was affected by " + $scope.affectedCountries[data.results.query[0]] + " recalls";

      L.circleMarker(data.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f22',
          'marker-symbol': 'circle-stroked'
        }),
        radius: map.getZoom()/$scope.affectedCountries[data.results.query[0]]
      }).bindPopup(content).addTo(areas);
      map.fitBounds(areas.getBounds());
    }
    $scope.errorHappenedMapArea = false;
  }
);
