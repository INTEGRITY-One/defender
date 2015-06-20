'use strict';

describe('Controller: RefinerAreaCtrl', function () {

  // load the controller's module
  beforeEach(module('defenderApp'));

  var RefinerAreaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RefinerAreaCtrl = $controller('RefinerAreaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
