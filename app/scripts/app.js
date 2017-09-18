'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3',
    'chart.js',
    'xeditable',
    'ngMaterial'
  ])
  .config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('action', '../assets/iconsets/action-icons.svg', 24)
      .iconSet('alert', '../assets/iconsets/alert-icons.svg', 24)
      .iconSet('av', '../assets/iconsets/av-icons.svg', 24)
      .iconSet('communication', '../assets/iconsets/communication-icons.svg', 24)
      .iconSet('content', '../assets/iconsets/content-icons.svg', 24)
      .iconSet('device', '../assets/iconsets/device-icons.svg', 24)
      .iconSet('editor', '../assets/iconsets/editor-icons.svg', 24)
      .iconSet('file', '../assets/iconsets/file-icons.svg', 24)
      .iconSet('hardware', '../assets/iconsets/hardware-icons.svg', 24)
      .iconSet('icons', '../assets/iconsets/icons-icons.svg', 24)
      .iconSet('image', '../assets/iconsets/image-icons.svg', 24)
      .iconSet('maps', '../assets/iconsets/maps-icons.svg', 24)
      .iconSet('navigation', '../assets/iconsets/navigation-icons.svg', 24)
      .iconSet('notification', '../assets/iconsets/notification-icons.svg', 24)
      .iconSet('social', '../assets/iconsets/social-icons.svg', 24)
      .iconSet('toggle', '../assets/iconsets/toggle-icons.svg', 24)
      .iconSet('avatar', '../assets/iconsets/avatar-icons.svg', 128);
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/shell', {
        templateUrl: 'views/shell.html',
        controller: 'ShellCtrl',
        controllerAs: 'shell'
      })
      .when('/resource', {
        templateUrl: 'views/resource.html',
        controller: 'ResourceCtrl',
        controllerAs: 'resource'
      })
      .when('/service', {
        templateUrl: 'views/service.html',
        controller: 'ServiceCtrl',
        controllerAs: 'service'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/welxome', {
        templateUrl: 'views/welxome.html',
        controller: 'WelxomeCtrl',
        controllerAs: 'welxome'
      })
      .when('/goal', {
        templateUrl: 'views/goal.html',
        controller: 'GoalCtrl',
        controllerAs: 'goal'
      })
      .when('/learner', {
        templateUrl: 'views/learner.html',
        controller: 'LearnerCtrl',
        controllerAs: 'learner'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl',
        controllerAs: 'report'
      })
      .when('/case_report', {
        templateUrl: 'views/case_report.html',
        controller: 'CaseReportCtrl',
        controllerAs: 'caseReport'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/case', {
        templateUrl: 'views/case.html',
        controller: 'CaseCtrl',
        controllerAs: 'case'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');
  }).run(['$rootScope', '$location', 'editableOptions', function($rootScope, $location, editableOptions){
   var path = function() { return $location.path();};
   $rootScope.$watch(path, function(newVal, oldVal){
     $rootScope.activetab = newVal;
     oldVal =newVal;
   });
     editableOptions.theme = 'bs3';
}]);
