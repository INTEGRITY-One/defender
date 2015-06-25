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

  describe('when building top news', function(){
    it('should have an updateRssUI function', function() {
      expect(scope.updateRssUI).not.toEqual(null);
    })

    it('should return false from updateRssUI if the DOM element is undefined', function() {
      expect(scope.updateRssUI('#undefined-element', 999, "link", "title", "contentSnippet", "url")).toBeFalsy();
    })
  });
});
