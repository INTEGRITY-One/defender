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

    $scope.showInfoIsVisible = false;

    $scope.getApi = function() {
      $http.get('/api/things')
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text('food recalls in the past 90 days');
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

    $scope.currSearchTerm = "";
    $scope.getApiSearchTerm = function() {
      $http.get('/api/things/reason_for_recall:' + $scope.currSearchTerm + "+product_description:" + $scope.currSearchTerm + "+recalling_firm:" + $scope.currSearchTerm)
        .success(function (recallResultsList) {
          var response = JSON.parse(recallResultsList);
          var results = response.results;
          $scope.totalPages = Math.ceil(response.meta.results.total / $scope.pageSize);
          $scope.recallResultsList = results;
          $('#big-query-text-value').text(response.meta.results.total);
          $('#big-query-text-label').text($scope.currSearchTerm + ' recalls in the past 90 days');
        })
        .error(function () {
          $scope.errorHappenedResultsArea = true;
        });
    }
    window.setInterval(function() {
      if(defender.searchTerm !== $scope.currSearchTerm) {
        console.log('searched: ' + defender.searchTerm)
        $scope.currSearchTerm = defender.searchTerm;

        if($scope.currSearchTerm !== "") {
          $scope.getApiSearchTerm();
        }
        else {
          $scope.getApi();
        }
      }
    },500);

    $('#info-container').fadeOut();
    $scope.showMoreInfo = function(idx) {
      console.log(idx);
      $('#showMoreModalTitle').text('Recall #' + $scope.recallResultsList[idx]['recall_number']);
      $('#text_reason_for_recall').text($scope.recallResultsList[idx]['reason_for_recall']);
      $('#text_status').text($scope.recallResultsList[idx]['status']);
      $('#text_distribution_pattern').text($scope.recallResultsList[idx]['distribution_pattern']);
      $('#text_product_quantity').text($scope.recallResultsList[idx]['product_quantity']);
      $('#text_recall_initiation_date').text($scope.recallResultsList[idx]['recall_initiation_date']);
      $('#text_state').text($scope.recallResultsList[idx]['state']);
      $('#text_product_type').text($scope.recallResultsList[idx]['product_type']);
      $('#text_event_id').text($scope.recallResultsList[idx]['event_id']);
      $('#text_product_description').text($scope.recallResultsList[idx]['product_description']);
      $('#text_country').text($scope.recallResultsList[idx]['country']);
      $('#text_city').text($scope.recallResultsList[idx]['city']);
      $('#text_recalling_firm').text($scope.recallResultsList[idx]['recalling_firm']);
      $('#text_report_date').text($scope.recallResultsList[idx]['report_date']);
      $('#text_voluntary_mandated').text($scope.recallResultsList[idx]['voluntary_mandated']);
      $('#text_classification').text($scope.recallResultsList[idx]['classification']);
      $('#text_code_info').text($scope.recallResultsList[idx]['code_info']);
      $('#text_initial_firm_notification').text($scope.recallResultsList[idx]['initial_firm_notification']);
    }
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
