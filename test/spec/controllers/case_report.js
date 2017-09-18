'use strict';

describe('Controller: CaseReportCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var CaseReportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CaseReportCtrl = $controller('CaseReportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CaseReportCtrl.awesomeThings.length).toBe(3);
  });
});
