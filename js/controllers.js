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
  };
  
  function Attribute(name, index){
    this.name = name;
    this.basevalue = 10;
    this.bonus = 0;
    this.value = 0;
    this.index = index;
  };
  
  $scope.character.attributes.strength = new Attribute('strength',1);
  $scope.character.attributes.dexterity = new Attribute('dexterity',2);
  $scope.character.attributes.constitution = new Attribute('constitution',3);
  $scope.character.attributes.intelligence = new Attribute('intelligence',4);
  $scope.character.attributes.wisdom = new Attribute('wisdom',5);
  $scope.character.attributes.charisma = new Attribute('charisma',6);
  
  function Skill(name, attribute){
    this.name = name;
    this.attribute = attribute;
    this.value = 0;
    this.bonus = 0;
    this.ranks = 0;
  };
  
  $scope.addSkill = function(){
    $scope.character.skills[$scope.addSkillForm.name.toLowerCase()] = new Skill($scope.addSkillForm.name.toLowerCase(),$scope.addSkillForm.attribute);
    $scope.addSkillForm = {};
  };
  
  $scope.update = function(){
    //attributes
    angular.forEach($scope.character.attributes, function(item){
      item.value = item.basevalue + item.bonus;
      item.mod = parseInt((item.value - 10)/2);
    });
    
    //skills
    angular.forEach($scope.character.skills, function(item){
      item.statbonus = $scope.character.attributes[item.attribute].mod
      item.value = item.ranks + item.statbonus + item.bonus;
    });
  };
  
  $scope.$watch('character', function(){$scope.update()},true);
}]);