var csServices = angular.module('csServices', []);

csServices.service('LocalStorageService', [ '$rootScope', function(){
  var service = {
    load: function(key, value){
      return JSON.parse(localStorage[key]);
    },
    save: function(key, value){
      localStorage[key] = JSON.stringify(value);
    }
  } 
  return service;
}]);