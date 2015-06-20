'use strict';

describe('Controller: ResultsAreaCtrl', function () {

  // load the controller's module
  beforeEach(module('defenderApp'));

  var ResultsAreaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResultsAreaCtrl = $controller('ResultsAreaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
