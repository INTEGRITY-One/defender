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

  describe('on randomized refinement', function() {
    it('should have a getRandomResult function', function() {
      expect(scope.getRandomResult).not.toEqual(null);
    });

    it('should return false if the randomizer list is empty', function() {
      var randomList = [];
      expect(scope.getRandomResult(randomList)).toBeFalsy();
    });
  })
});
