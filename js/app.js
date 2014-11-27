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
    when('/', {
      redirectTo: '/main'
    }).
    when('/main', {
      templateUrl: 'partials/main.html'
    }).
    when('/skills', {
      templateUrl: 'partials/skills.html'
    }).
    when('/levels', {
      templateUrl: 'partials/levels.html'
    }).
    when('/graphs', {
      templateUrl: 'partials/graphs.html'
    }).
    when('/items', {
      templateUrl: 'partials/items.html'
    });
});

csApp.filter('parseInt', function() {
  return function(input) {
    return parseInt(input);
  };
});