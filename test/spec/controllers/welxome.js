'use strict';

describe('Controller: WelxomeCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var WelxomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WelxomeCtrl = $controller('WelxomeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WelxomeCtrl.awesomeThings.length).toBe(3);
  });
});
