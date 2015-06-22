'use strict';

angular.module('defenderApp')
  .controller('MapAreaCtrl', function ($scope, $http) {
    //this file configures the MapBox map to be displayed on client

    console.log('map.html: Attempting to load the map...');
    // Initialize the map
    var map;

    // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1IjoiZWhvbGxpbmdzd29ydGgiLCJhIjoiYmExYTk3MGYxOTJiYzVmNjAxM2E2YTI3NmU3NTM3YTIifQ.sV3ISTtVIipf3i9pvAYy8Q';
    // Create a map in the div #map
    map = L.mapbox.map('map', 'mapbox.light').setView([37.78, -92.85], 2); // World Map
    // Include handy Geosearch control
    var searchControl = new L.mapbox.geocoderControl('mapbox.places').addTo(map);

    //on error
    $scope.errorHappenedMapArea = false;
  }
);
