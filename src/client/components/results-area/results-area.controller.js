'use strict';

angular.module('defenderApp')
  .controller('ResultsAreaCtrl', function ($scope) {
    //this file pull data from server and populate bootstrap grid on client
    $scope.recallResultsList = [];
    $http.get('/api/things').success(function(recallResultsList) {
      $scope.recallResultsList = recallResultsList;
    });
  });
