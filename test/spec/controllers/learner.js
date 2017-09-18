'use strict';

describe('Controller: LearnerCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var LearnerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LearnerCtrl = $controller('LearnerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LearnerCtrl.awesomeThings.length).toBe(3);
  });
});
