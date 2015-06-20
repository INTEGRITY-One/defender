'use strict';

angular.module('defenderApp')
  .controller('ResultsAreaCtrl', function ($scope, $http) {
    //this file pull data from server and populate bootstrap grid on client

    //on error
    $scope.errorHappenedResultsArea = false;

    $scope.recallResultsList = [];
    $http.get('/api/things')
      .success(function (recallResultsList) {
      $scope.recallResultsList = recallResultsList.results;
    })
      .error(function () {
        $scope.errorHappenedResultsArea = true;
    });
  });
