var csControllers = angular.module('csControllers', []);

var ae = angular.element;

function isInt(value) {
  return !isNaN(value) && parseInt(value) == value;
}

csControllers.controller('charCtrl', function($scope, LocalStorageService){
  $scope.text = 'Hello World!';
});