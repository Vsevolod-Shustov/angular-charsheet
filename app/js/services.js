"use strict";
var csServices = angular.module('csServices', []);

csServices.service('LocalStorageService', ['$rootScope', function(){
  var service = {
    load: function(key, value){
      return angular.fromJson(localStorage[key]);
    },
    save: function(key, value){
      localStorage[key] = angular.toJson(value);
    }
  } 
  return service;
}]);