'use strict';

var defender = defender || {};
defender.searchTerm = '';
defender.toggleAreas = false; // Affected areas off by default

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

angular.module('defenderApp')
  .controller('RefinerAreaCtrl', function ($scope) {
    $scope.refineResults = function() {
      var term = $('#input-refiner').val();
      defender.searchTerm = term;
    };

    $scope.selectFood = function() {
      $('#selector-food').removeClass('btn-default');
      $('#selector-food').addClass('btn-danger');
      $('#selector-food').addClass('selected');
      $('#selector-drug').removeClass('btn-info');
      $('#selector-drug').addClass('btn-default');
      $('#selector-drug').removeClass('selected');
      $('#selector-device').removeClass('btn-warning');
      $('#selector-device').addClass('btn-default');
      $('#selector-device').removeClass('selected');
      $('#input-refiner').val('');
      defender.searchTerm = '_execFood';
    };

    $scope.selectDrug = function() {
      $('#selector-drug').removeClass('btn-default');
      $('#selector-drug').addClass('btn-info');
      $('#selector-drug').addClass('selected');
      $('#selector-food').removeClass('btn-danger');
      $('#selector-food').addClass('btn-default');
      $('#selector-food').removeClass('selected');
      $('#selector-device').removeClass('btn-warning');
      $('#selector-device').addClass('btn-default');
      $('#selector-device').removeClass('selected');
      $('#input-refiner').val('');
      defender.searchTerm = '_execDrug';
    };

    $scope.selectDevice = function() {
      $('#selector-device').removeClass('btn-default');
      $('#selector-device').addClass('btn-warning');
      $('#selector-device').addClass('selected');
      $('#selector-food').removeClass('btn-danger');
      $('#selector-food').addClass('btn-default');
      $('#selector-food').removeClass('selected');
      $('#selector-drug').removeClass('btn-info');
      $('#selector-drug').addClass('btn-default');
      $('#selector-drug').removeClass('selected');
      $('#input-refiner').val('');
      defender.searchTerm = '_execDevice';
    };

    var randomFoodResultList = [
      'ice cream',
      'cheese',
      'Bread',
      'Burrito',
      'Beef',
      'Pork',
      'Chicken',
      'Dip',
      'Whole',
      'Health one',
      'Sugar',
      'Milk',
      'Listeria',
      'Organic',
      'Soup',
      'Corn',
      'cheese'];

    var randomDrugResultList = [
      'sodium',
      'Penicillin',
      'Contamination',
      'Attix',
      'Capsules',
      'Health',
      'Control',
      'Pharmacy',
      'Injection',
      'Pollen',
      'Expiry'];

    var randomDeviceResultList = [
      'Hip',
      'Knee',
      'Shoulder',
      'Heart',
      'Pediatric',
      'Expiry',
      'Breath',
      'Surgical',
      'Pump',
      'Medical'];

    $scope.refineRandomResults = function() {
      var newTerm = $('#input-refiner').val();
      while(newTerm === $('#input-refiner').val()) {
        if($('#selector-food').hasClass('selected')) {
          $scope.getRandomResult(randomFoodResultList);
        }
        else if($('#selector-drug').hasClass('selected')) {
          $scope.getRandomResult(randomDrugResultList);
        }
        else if($('#selector-device').hasClass('selected')) {
          $scope.getRandomResult(randomDeviceResultList);
        }
      }
      var term = $('#input-refiner').val();
      defender.searchTerm = term;
      return true;
    };

    $scope.getRandomResult = function(randomList) {
      if(randomList.length === 0) {
        return false;
      }
      var r = Math.floor((Math.random() * randomList.length));
      $('#input-refiner').val(randomList[r]);
      return true;
    };

    $scope.toggleAffectedAreas = function() {
      if (!defender.toggleAreas) {
        $('#chk-affected-areas').addClass('selected');
        defender.toggleAreas = true;
        console.log('Toggled affected areas on');
      }
      else {
        $('#chk-affected-areas').removeClass('selected');
        defender.toggleAreas = false;
        console.log('Toggled affected areas off');
      }
    };
  });
