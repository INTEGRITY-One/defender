'use strict';

angular.module('defenderApp')
  .controller('MapAreaCtrl', function ($scope, $http) {
    // This file configures the MapBox map to be displayed on client
    // Initialize some variables
    var map;
    $scope.currResults = []; // Resultset from module
    // Primary FeatureGroups to display on the map
    var features, areas;
    // Arrays for Cities, States, & Countries
    var cities = [], cityCounts = [], cityGeoData = [];
    var states = [], stateCounts = [], stateGeoData = [];
    var countries = [], countryCounts = [], countryGeoData = [];
    var ready = false;

    // Provide mapbox access token & configure geocoder
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
    // Custom icon for Device recalls
    var devIcon = L.icon({
      iconUrl: 'assets/images/device_yellow.png',
      iconSize: [30, 30]
    });

    // Initialize the map for the first time
    $scope.initMap = function () {
      console.log('map.controller: Initializing the map...');
      // One-time call to set the module-level function - NOT presently needed...
      /*if (defender.resetMap === undefined) {
        defender.resetMap = $scope.resetMap;
        console.log("map.controller: Attached map reset method to global context!");
      }*/

      // This window interval acts as a handler for asynchronous processing
      window.setInterval(function () {
        if (defender.currentResults !== undefined) {
          // Looks for data updates from component scope
          if (defender.currentResults !== $scope.currResults) {
            console.log('map.controller: Detected change in Resultset - updating map!');
            // Set local variables to module-level values (to detect subsequent changes)
            $scope.currResults = defender.currentResults;
            $scope.affectedStates = defender.affectedStates;
            $scope.affectedCountries = defender.affectedForeignCountries;
            $scope.toggleAreas = defender.toggleAreas;

            // Update the map with new data
            $scope.resetMap();
          }

          // Ensure we don't attempt to render FeatureGroups until ALL geocoding is complete
          // Note: Tricky edge cases where cities == 0 OR states == 0 OR countries == 0 are OK!
          if (ready && ((cities.length > 0 && cityGeoData.length === cities.length) || cities.length === 0) &&
              ((states.length > 0 && stateGeoData.length === states.length) || states.length === 0) &&
              ((countries.length > 0 && countryGeoData.length === countries.length) || countries.length === 0)) {
            console.log("map.controller: Detected completion of geocoding - rendering features and areas!");
            ready = false; // reset the "ready" flag

            // Render the FeatureGroups onto the map
            renderFeatureGroups();
          }
        }
      }, 1000); // ...every second
    };

    // Main function for (re)-building the Map
    $scope.resetMap = function() {
      console.log('map.controller: Resetting map...');

      // If Map exists, Kill it!
      if (map !== undefined)
        map.remove();

      map = L.mapbox.map('map');
      map.on("overlayremove", function(e) {
        if (e.name === "Affected Areas") {
          //console.log("map.controller: Removing Affected Areas...");
          $scope.toggleAreas = false;
          defender.toggleAreas = false;
          map.fitBounds(features.getBounds()); // Auto-zoom to Features only
        }
      }).on("overlayadd", function(e) {
        if (e.name === "Affected Areas") {
          //console.log("map.controller: Adding Affected Areas...");
          $scope.toggleAreas = true;
          defender.toggleAreas = true;
          map.fitBounds(areas.getBounds());  // Auto-zoom to Affected Areas
        }
      });

      // State of affected areas is controlled by Layer Control now
      $scope.updateFeatures($scope.currResults);
      $scope.updateAffectedAreas($scope.affectedStates,$scope.affectedCountries);
    };

    // Identify and Geocode recall sites (Cities)
    $scope.updateFeatures = function (results) {
      // Geocode the City, ST of the results to build up the FeatureLayer
      cities = []; // Initialize the arrays
      cityCounts = [];
      cityGeoData = [];
      // Just count the cities first
      for (var i = ($scope.currResults).length - 1; i >= 0; i--) {
        var cityKey = $scope.currResults[i].city.toLowerCase().replace(/ /g, "") +
          ($scope.currResults[i].state!==null?$scope.currResults[i].state.toLowerCase().replace(/ /g, ""):"") +
          $scope.currResults[i].country.toLowerCase().replace(/ /g, "");

        // Suppress duplicate markers
        if (cities.indexOf(cityKey) === -1) {
          cities.push(cityKey);
          cityCounts[cityKey] = 1; // First record for this city
        }
        else
          cityCounts[cityKey] = cityCounts[cityKey] + 1;
      }
      ready = true;

      // Kick off geocoder calls to geocode each City
      for (var i = 0; i < cities.length; i++)
        geocoder.query($scope.currResults[i].city + ", " +
          ($scope.currResults[i].state!==null?$scope.currResults[i].state + ", ":"")  +
          $scope.currResults[i].country, function(err, data) {cityGeoData.push(data);});
      // Even though geocoder may still be processing results, we alreaady know total...
    }

    // Render affected areas (States, Countries)
    $scope.updateAffectedAreas = function (stateList, countryList) {
      states = []; // Initialize arrays
      stateCounts = [];
      stateGeoData = [];
      countries = [];
      countryCounts = [];
      countryGeoData = [];

      // Just count the states w/ count > 0 first
      for (var i = stateList.length - 1; i >= 0; i--) {
        var curState = stateList[i];
        var curStateValue = stateList[curState];
        if (curStateValue > 0) {
          states.push(curState);
          stateCounts[curState] = curStateValue;
        }
      }
      // Just count the countries w/ count > 0 first
      for (var i = countryList.length - 1; i >= 0; i--) {
        var curCountry = countryList[i];
        var curCountryValue = countryList[curCountry];
        if (curCountryValue > 0) {
          countries.push(curCountry);
          countryCounts[curCountry] = curCountryValue;
        }
      }
      ready = true;

      // Kick off geocoder calls to geocode each state w/ count > 0
      for (var i = 0; i < states.length; i++)
        geocoder.query(states[i] + ", United States", function(err, data) {stateGeoData.push(data);});
      // Kick off geocoder calls to geocode each country w/ count > 0
      for (var i = 0; i < countries.length; i++)
        geocoder.query(countries[i], function(err, data) {countryGeoData.push(data);});

      // Even though geocoder may still be processing results, we already know totals...
    }

    // ...which allows us to wait until all geocoding is complete before continuing
    function renderFeatureGroups() {
      // NOW, it should be safe to proceed
      features = new L.FeatureGroup();
      for (var i = 0; i < cityGeoData.length; i++)
        buildCityMarker(cityGeoData[i]);
      //console.log("map.controller: Finished building " + cityGeoData.length + " City markers");

      areas = new L.FeatureGroup();
      for (var i = 0; i < stateGeoData.length; i++)
        buildStateBubble(stateGeoData[i]);
      for (var i = 0; i < countryGeoData.length; i++)
        buildCountryBubble(countryGeoData[i]);
      //console.log("map.controller: Finished building " + (stateGeoData.length + countryGeoData.length) + " Affected Area bubbles");

      // Finally, add Layer control to Map and autozoom
      /* Additional basemap options:
          'Mapbox Light': L.mapbox.tileLayer('mapbox.light')
          'Mapbox Dark': L.mapbox.tileLayer('mapbox.dark')
          'Mapbox Pencil': L.mapbox.tileLayer('mapbox.pencil')
      */
      L.control.layers({
        'Basic Streets': L.mapbox.tileLayer('mapbox.streets').addTo(map),
        'Comic Book': L.mapbox.tileLayer('mapbox.comic')
      }, {
        'Recall Sites': features.addTo(map),
        'Affected Areas': areas
      }, {
        'collapsed': false
      }).addTo(map);
      // If Affected Areas toggle is set, preserve the selection
      if ($scope.toggleAreas) {
        areas.addTo(map);
        map.fitBounds(areas.getBounds()); // If Affected Areas is active, zoom to these bounds...
      }
      else
        map.fitBounds(features.getBounds()); //..., otherwise just use the Feature locations
    }

    // Function for creating the city Markers
    function buildCityMarker(data) {
      // Build text to appear in popup dialog
      var cityKey = data.results.query.join().replace(/,/g,"");
      var label = "";
      for (var i = 0; i < data.results.query.length; i++) {
        switch(i) {
          case data.results.query.length-2:
            // Handle case where there's only 2 parts total, e.g. international City and Country
            if (data.results.query.length <= 2)
              label = data.results.query[i].substring(0,1).toUpperCase() + data.results.query[i].slice(1);
            else if (data.results.query[i].length == 2)  // likely a State
              label = label + ", " + data.results.query[i].toUpperCase();
            break;
          case data.results.query.length-1:
            label = label + ", " + data.results.query[i].toUpperCase();
            break;
          default:
            label = label + " " + data.results.query[i].substring(0,1).toUpperCase() + data.results.query[i].slice(1);
            break;
        }
      }
      var content = label + " was the source of " + cityCounts[cityKey] + " recall" + (cityCounts[cityKey]>1?"s":"");

      // Choose which icon to use
      var theIcon = foodIcon; // default
      if($('#selector-food').hasClass('selected'))
        theIcon = foodIcon;
      if($('#selector-drug').hasClass('selected'))
        theIcon = drugIcon;
      if($('#selector-device').hasClass('selected'))
        theIcon = devIcon;

      // Create the Marker and add to FeatureGroup
      L.marker(data.latlng, {
        icon: theIcon
      }).bindPopup(content)
        .addTo(features);
    }

    // Callback function for adding affected US States
    function buildStateBubble(data) {
      // Build text to appear in popup dialog
      var content = data.results.features[0].place_name + " was affected by " +
        $scope.affectedStates[data.results.query[0]] + " recall" +
        ($scope.affectedStates[data.results.query[0]]>1?"s":"");

      // Choose which color to use
      var theColor = '#E74C3C'; // default
      if($('#selector-food').hasClass('selected'))
        theColor = '#E74C3C';
      if($('#selector-drug').hasClass('selected'))
        theColor = '#3498db';
      if($('#selector-device').hasClass('selected'))
        theColor = '#f39c12';
      // Render as variable-size "bubble" (circle)
      var geojsonMarkerOptions = {
        radius: $scope.affectedStates[data.results.query[0]]>35?
          35:$scope.affectedStates[data.results.query[0]], // TODO: Scaling needs to be improved...
        fillColor: theColor,
        color: theColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3
      };
      L.circleMarker(data.latlng,
        geojsonMarkerOptions
      ).bindPopup(content)
        .addTo(areas);
    }

    // Callback function for adding affected Foreign Countries
    function buildCountryBubble(data) {
      // Build text to appear in popup dialog
      var content = data.results.features[0].place_name + " was affected by " +
        $scope.affectedCountries[data.results.query.join().replace(/,/g," ")] + " recall" +
        ($scope.affectedCountries[data.results.query.join().replace(/,/g," ")]>1?"s":"");

      // Choose which color to use
      var theColor = '#E74C3C'; // default
      if($('#selector-food').hasClass('selected'))
        theColor = '#E74C3C';
      if($('#selector-drug').hasClass('selected'))
        theColor = '#3498db';
      if($('#selector-device').hasClass('selected'))
        theColor = '#f39c12';
      // Render as variable-size "bubble" (circle)
      var geojsonMarkerOptions = {
        radius: $scope.affectedCountries[data.results.query[0]]>35?
          35:$scope.affectedCountries[data.results.query[0]], // TODO: Scaling needs to be improved...
        fillColor: theColor,
        color: theColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.3
      };
      L.circleMarker(data.latlng,
        geojsonMarkerOptions
      ).bindPopup(content)
        .addTo(areas);
    }
    $scope.errorHappenedMapArea = false;
  }
);
