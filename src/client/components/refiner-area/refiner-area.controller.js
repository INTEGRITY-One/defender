'use strict';

var defender = defender || {};
defender.searchTerm = "";

angular.module('defenderApp')
  .controller('RefinerAreaCtrl', function ($scope) {
    //this file will hook in functionality to the refiner area such as FOOD.click, SearchBoxGo.Click

    $scope.refineResults = function() {
      var term = $('#input-refiner').val();
      defender.searchTerm = term;
      console.log(defender.searchTerm);
    }
  });
