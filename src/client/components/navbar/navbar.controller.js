'use strict';

var defender = defender || {};

angular.module('defenderApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [];
    $scope.menuRight = [{
      'title': 'About',
      'link': '#about'
    }];

    $('.navbar-brand').click(function() {
      //resets to initial state
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
      defender.toggleAreas = false;
      //$('#chk-affected-areas').removeClass('selected');
      //$('#chk-affected-areas').prop('checked',false);
    });

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
