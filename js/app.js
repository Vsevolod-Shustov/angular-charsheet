"use strict";
var csApp = angular.module('csApp', [
  'csControllers',
  'csServices'
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