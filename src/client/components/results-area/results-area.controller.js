'use strict';

angular.module('defenderApp')
  .controller('ResultsAreaCtrl', function ($scope, $http) {
    //this file pull data from server and populate bootstrap grid on client

    //on error
    $scope.errorHappenedResultsArea = false;

    //pagination
    $scope.skip = 30;
    $scope.pageSize = 10;
    $scope.totalPages = 20;
    $scope.currentPage = 1;

    $scope.recallResultsList = [];

    $scope.getApi = function() {
      $http.get('/api/things?skip=30')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = response.meta.results.total / $scope.pageSize;
          $scope.recallResultsList = results;
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    }
    $scope.nextPage = function() {
      $scope.currentPage = $scope.currentPage + 1;
      $scope.skip = $scope.skip + 10;
      $scope.getApi();
      console.log($scope.skip)
    }

    $scope.getApi();
  });

/**
 * Ng-Repeat implementation working with number ranges.
 *
 * @author Umed Khudoiberdiev
 */
angular.module('defenderApp').directive('ngRepeatRange', ['$compile', function ($compile) {
  return {
    replace: true,
    scope: { from: '=', to: '=', step: '=' },

    link: function (scope, element, attrs) {

      // returns an array with the range of numbers
      // you can use _.range instead if you use underscore
      function range(from, to, step) {
        var array = [];
        while (from + step <= to)
          array[array.length] = from += step;

        return array;
      }

      // prepare range options
      var from = scope.from || 0;
      var step = scope.step || 1;
      var to   = scope.to || attrs.ngRepeatRange;

      // get range of numbers, convert to the string and add ng-repeat
      var rangeString = range(from, to + 1, step).join(',');
      angular.element(element).attr('ng-repeat', 'n in [' + rangeString + ']');
      angular.element(element).removeAttr('ng-repeat-range');

      $compile(element)(scope);
    }
  };
}]);
