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
      iconUrl: 'assets/images/device_yellow.png',
      iconSize: [30, 30]
    });

    // Create a map in the div #map
    $scope.initMap = function () {
      console.log('map.html: Attempting to load the map...');

      // Looks for data updates from component scope
      window.setInterval(function () {
        if (defender.currentResults !== undefined) {
          if (defender.currentResults !== $scope.currResults || defender.toggleAreas != $scope.toggleAreas) {
            console.log('map.controller: state changed - updating map!');
            $scope.currResults = defender.currentResults;
            $scope.affectedStates = defender.affectedStates;
            $scope.affectedCountries = defender.affectedForeignCountries;
            $scope.toggleAreas = defender.toggleAreas;

            // Update the map with new data
            $scope.resetMap();
          }
          // Conditionally update Affected Areas, based on selection
          else if (defender.toggleAreas != $scope.toggleAreas) {
            $scope.toggleAreas = defender.toggleAreas;
            $scope.resetMap();
          }
        }
      }, 1000); // ...every second
    };

    $scope.resetMap = function() {
      console.log('map.controller: Resetting map...');

      // Handle case where map does not yet have Layers
      //if (map.layers !== undefined)
      if (map !== undefined)
        map.remove();

      map = L.mapbox.map('map', 'mapbox.light').setView([37.78, -92.85], 1); // World Map
      features = new L.FeatureGroup().addTo(map); // Re-initializes
      areas = new L.FeatureGroup().addTo(map);
      features.on("layeradd", function() {
        // TODO: Performance Issue - should defer auto-zoom until all features are present
        if (areas.getBounds() > features.getBounds())
          map.fitBounds(areas.getBounds());
        else
          map.fitBounds(features.getBounds());
      });
      areas.on("layeradd", function() {
          // TODO: Performance Issue - should defer auto-zoom until all features are present
          if (areas.getBounds() > features.getBounds())
            map.fitBounds(areas.getBounds());
          else
            map.fitBounds(features.getBounds());
      });

      // Conditionally update Affected Areas, based on selection
      if ($scope.toggleAreas)
        $scope.updateAffectedAreas($scope.affectedStates,$scope.affectedCountries);

      $scope.updateFeatures($scope.currResults);
      console.log('map.controller: Successfully rebuilt map!');
    };

    // Render recall sites (Cities)
    $scope.updateFeatures = function (results) {
      // Geocode the City, ST of the results to build up the FeatureLayer
      var cities = [];
      for (var i = ($scope.currResults).length - 1; i >= 0; i--) { // Suppress duplicate markers
        if (cities.indexOf($scope.currResults[i].city + ", " + $scope.currResults[i].state) === -1) {
          geocoder.query($scope.currResults[i].city + ", " + $scope.currResults[i].state, addCity);
          cities.push($scope.currResults[i].city + ", " + $scope.currResults[i].state);
        }
      }
    };

    // Render affected areas (States, Countries)
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
    };

    // Function for building up the "features" FeatureGroup
    function addCity(err, data) {
      // Build text to appear in popup dialog
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
    }

    // Callback function for adding affected US States
    function addState(err, data) {
      // Build text to appear in popup dialog
      var content = data.results.query[0] + " was affected by " + $scope.affectedStates[data.results.query[0]] + " recalls";

      L.circleMarker(data.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f22',
          'marker-symbol': 'circle-stroked'
        }),
        radius: $scope.affectedStates[data.results.query[0]] // TODO: Needs to be improved...
      }).bindPopup(content).addTo(areas);
    }

    // Callback function for adding affected Foreign Countries
    function addCountry(err, data) {
      // Build text to appear in popup dialog
      var content = data.results.query[0] + " was affected by " + $scope.affectedCountries[data.results.query[0]] + " recalls";

      // Render as variable-size "bubble" (circle)
      L.circleMarker(data.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f22',
          'marker-symbol': 'circle-stroked'
        }),
        radius: $scope.affectedCountries[data.results.query[0]] // TODO: Needs to be improved...
      }).bindPopup(content).addTo(areas);
    }
    $scope.errorHappenedMapArea = false;
  }
);
