'use strict';

describe('Controller: MapAreaCtrl', function () {

  // load the controller's module
  beforeEach(module('defenderApp'));

  var MapAreaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapAreaCtrl = $controller('MapAreaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
