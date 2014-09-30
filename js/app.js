"use strict";
var csApp = angular.module('csApp', [
  'ngRoute',
  'csControllers',
  'csServices',
  'csDirectives'
]);

csApp.filter("toArray", function(){
    return function(obj) {
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
        });
        return result;
    };
});

csApp.config(function($routeProvider) {
    $routeProvider.
    when('/main', {
      templateUrl: 'partials/main.html'
    }).
    when('/skills', {
      templateUrl: 'partials/skills.html'
    }).
    when('/levels', {
      templateUrl: 'partials/levels.html'
    }).
    when('/', {
      templateUrl: 'partials/main.html'
    });
});