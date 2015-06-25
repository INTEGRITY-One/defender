'use strict';

describe('Controller: ResultsAreaCtrl', function () {

  // load the controller's module
  beforeEach(module('defenderApp'));

  var ResultsAreaCtrl, scope, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    ResultsAreaCtrl = $controller('ResultsAreaCtrl', {
      $scope: scope
    });
  }));

  it('should have a getApiFood function', function() {
    expect(scope.getApiFood).not.toEqual(null);
  })

  describe('when the page loads', function() {
    it('should have a formatDate function', function() {
      expect(scope.formatDate).not.toEqual(null);
    });

    it('should be able to format dates using the formatDates function', function() {
      var expectedInputDate = "20150525";
      var expectedOutputDate = "05/25/2015";
      var actualOutput = scope.formatDate(expectedInputDate);
      expect(actualOutput).toEqual(expectedOutputDate);
    });
  });

  describe('when user clicks grid\'s More button', function() {
    it('should have a showMoreInfo function', function() {
      expect(scope.showMoreInfo).not.toEqual(null);
    });

    it('should return false if attempting to access element outside of array bounds', function() {
      scope.recallResultsList = [];
      scope.recallResultsList[0] = "defined";
      expect(scope.showMoreInfo(999)).toBeFalsy();
    });
  });

});
