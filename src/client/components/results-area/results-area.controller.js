'use strict';

angular.module('defenderApp')
  .controller('ResultsAreaCtrl', function ($scope, $http) {
    //this file pull data from server and populate bootstrap grid on client

    //on error
    $scope.errorHappenedResultsArea = false;

    $scope.recallResultsList = [];
    $http.get('/api/things')
      .success(function (recallResultsList) {
        $scope.recallResultsList = JSON.parse(recallResultsList).results;

        console.log(recallResultsList);
      })
      .error(function () {
        $scope.errorHappenedResultsArea = true;
      });

    // Initialize some variables...
    $scope.showMapResultsArea = true;

    var map;
    // Initialize map after page is fully loaded
    // $("#body").on('ready', function() {
    console.log("Attempting to load the map...");
    try {
      // Workaround...
      /*var setint = setInterval(function() {
       //if(typeof require != undefined) {
       clearInterval(setint);*/
      // Initialize the map
      //map = L.map('map');//.setView([37.78, -92.85], 4); // All of US

      //L.esri.basemapLayer('Gray').addTo(map);

      // Provide your access token
      L.mapbox.accessToken = 'pk.eyJ1IjoiZWhvbGxpbmdzd29ydGgiLCJhIjoiYmExYTk3MGYxOTJiYzVmNjAxM2E2YTI3NmU3NTM3YTIifQ.sV3ISTtVIipf3i9pvAYy8Q';
      // Create a map in the div #map

      /*var tiles = L.mapbox.tileLayer('http://{s}.tiles.mapbox.com/{id}/{z}/{x}/{y}.png', {
       id: 'mapbox.light',
       attribution: 'by me',
       defaults: {
         tileLayerOptions: {
           noWrap: 'true',
           tms: 'true'
         }
       },
       noWrap: 'true'
       });*/
        // Create a map in the div #map
        map = L.mapbox.map('map', 'mapbox.light').setView([37.78, -92.85], 1); // World Map
     /* map = L.mapbox.map('map', {
        center: [37.78, -92.85],
        zoom: 1 // World Map
      });//, 'mapbox.light');*/
      //map.setView(, 1);
      // Include handy Geosearch control
      var searchControl = new L.mapbox.geocoderControl('mapbox.places').addTo(map);
      console.log('map.html: Successfully loaded map!');
      //}
       //}, 5000);
    } catch (e) {
      console.log(e)
    }
    //});

  });
