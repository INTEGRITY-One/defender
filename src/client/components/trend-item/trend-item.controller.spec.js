'use strict';

describe('Controller: TrendItemCtrl', function () {

  // load the controller's module
  beforeEach(module('defenderApp'));

  var TrendItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrendItemCtrl = $controller('TrendItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
