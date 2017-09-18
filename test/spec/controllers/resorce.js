'use strict';

describe('Controller: ResorceCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var ResorceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResorceCtrl = $controller('ResorceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResorceCtrl.awesomeThings.length).toBe(3);
  });
});
