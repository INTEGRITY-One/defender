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

    var randomResultList = [
    "ice cream",
    "cheese",
    "Bread",
    "Burrito",
    "Beef",
    "Pork",
    "Chicken",
    "Dip",
    "Whole",
    "Health one",
    "Sugar",
    "Milk",
    "Listeria",
    "Organic",
    "Soup",
    "Corn"];

    $scope.refineRandomResults = function() {
      var r = Math.floor((Math.random() * randomResultList.length));
      $('#input-refiner').val(randomResultList[r]);
      var term = $('#input-refiner').val();
      defender.searchTerm = term;
      console.log(defender.searchTerm);
    }
  });
