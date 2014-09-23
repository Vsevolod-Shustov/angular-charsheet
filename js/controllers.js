"use strict";
var csControllers = angular.module('csControllers', []);

csControllers.controller('characterCtrl', ['$scope', 'LocalStorageService', function($scope, LocalStorageService){
  $scope.character = {};
  $scope.character.attributes = {};
  $scope.character.skills = {};

  //save character
  $scope.saveCharacter = function(){
    LocalStorageService.save('character', $scope.character);
  };
  //load character
  $scope.loadCharacter = function(){
    $scope.character = LocalStorageService.load('character');
    console.log($scope.character);
  };
  
  function Attribute(name, index){
    this.name = name;
    this.basevalue = 10;
    this.bonus = 0;
    this.value = 0;
    this.index = index;
  };
  
  /*Attribute.prototype.update = function(){
    this.value = this.basevalue + this.bonus;
    this.mod = parseInt((this.value - 10)/2);
    console.log(this.name + " " + this.value + " " + this.mod);
  };*/
  

  $scope.character.attributes.str = new Attribute('str',1);
  $scope.character.attributes.dex = new Attribute('dex',2);
  $scope.character.attributes.con = new Attribute('con',3);
  $scope.character.attributes.intl = new Attribute('int',4);
  $scope.character.attributes.wis = new Attribute('wis',5);
  $scope.character.attributes.cha = new Attribute('cha',6);
  
  /*function Skill(name, attribute){
    this.name = name;
    this.attribute = attribute;
    this.value = 0;
    this.bonus = 0;
    /*this.attributeBonus = $scope.character.attributes[attribute].value;
    this.update = function(){
      this.value = this.bonus + this.attributeBonus;
      console.log(this.name + " " + this.attribute + " " + this.value);
    };
  };
  
  $scope.character.skills.acrobatics = new Skill('Acrobatics','dex');
  console.log($scope.character.skills.acrobatics);*/
  $scope.update = function(){
    angular.forEach($scope.character.attributes, function(item){
      item.value = item.basevalue + item.bonus;
      item.mod = parseInt((item.value - 10)/2);
      console.log(item.name + " " + item.value + " " + item.mod);
    });
  };
}]);