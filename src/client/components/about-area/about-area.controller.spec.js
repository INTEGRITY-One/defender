'use strict';

describe('Controller: AboutAreaCtrl', function () {

  // load the controller's module
  beforeEach(module('defenderApp'));

  var AboutAreaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutAreaCtrl = $controller('AboutAreaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
