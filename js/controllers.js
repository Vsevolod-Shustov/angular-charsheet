"use strict";
var csControllers = angular.module('csControllers', []);

csControllers.controller('characterCtrl', ['$scope', 'LocalStorageService', function($scope, LocalStorageService){
  $scope.character = {};

  //save character
  $scope.saveCharacter = function(){
    LocalStorageService.save('character', $scope.character);
  };
  //load character
  $scope.loadCharacter = function(){
    $scope.character = LocalStorageService.load('character');
  };
  
  //list of bonus types
  $scope.bonusTypes = ['alchemical', 'armor', 'circumstance', 'competence', 'deflection', 'dodge', 'enhancement', 'inherent', 'insight', 'luck', 'morale', 'natural armor', 'profane', 'racial', 'resistance', 'sacred', 'shield', 'size', 'trait'];
  
  //bonuses
  function Bonus(source, type, value){
    this.type = type;
    this.source = source;
    this.value = value;
  };
  /*$scope.addBonus = function(source, name, value){
    console.log('attempting to set '+name+' bonus of '+target.name+' to '+value);
    target.bonuses[name.toLowerCase()] = new Bonus(name.toLowerCase(), source, value);
  };
  $scope.removeBonus = function(target, bonus){
    delete save.bonuses[bonus.name];
  };*/
  
  $scope.calculateBonuses = function(item){
    item.bonus = 0;
    angular.forEach(item.bonuses, function(bonus){
      item.bonus += bonus.value;
    });
  };
  
  //effects
  $scope.addEffectForm = {};
  $scope.addEffectForm.value = 0;
  function Effect(target, type, value){
    this.target = target;
    this.type = type;
    this.value = value;
  };
  $scope.addEffect = function(target, type, value, source){
    source.effects[target] = new Effect(target, type.toLowerCase(), value);
  };
  $scope.removeEffect = function(collection, target){
    delete collection[target];
  };
  
  //items
  $scope.character.items = {};
  function Item(name){
    this.name = name;
    this.effects = {};
  };
  $scope.addItem = function(name){
    $scope.character.items[name.toLowerCase()] = new Item(name.toLowerCase());
  };
  
  //attributes
  $scope.character.attributes = {};
    
  function Attribute(name, index){
    this.name = name;
    this.basevalue = 10;
    this.bonus = 0;
    this.value = 0;
    this.mod = 0;
    this.index = index;
  };
  
  var attributes = [
    {name:'strength',index:1},
    {name:'dexterity',index:2},
    {name:'constitution',index:3},
    {name:'intelligence',index:4},
    {name:'wisdom',index:5},
    {name:'charisma',index:6}
  ];
  
  angular.forEach(attributes, function(item){
    $scope.character.attributes[item.name] = new Attribute(item.name,item.index);
  });
  
  //skills
  $scope.character.skills = {};
  $scope.addSkillForm = {};
  
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
  
  //saves
  $scope.character.saves = {};
  
  function Save(name,attribute,index){
    this.name = name;
    this.attribute = attribute;
    this.value = 0;
    this.bonus = 0;
    this.bonuses = {};
    this.base = 0;
    this.index = index;
  };
  
  var saves = [
    {name:'fort', attribute:'constitution', index:1},
    {name:'ref', attribute:'dexterity', index:2},
    {name:'will', attribute:'wisdom', index:3}
  ];
  
  angular.forEach(saves, function(item){
    $scope.character.saves[item.name] = new Save(item.name, item.attribute, item.index);
  });
  
  //levels
  $scope.character.levels = {};
  //$scope.addLevelForm = {};
  $scope.addLevelForm = {
    'index':1,
    'name':'bard',
    'bab':'medium',
    'fort':'bad',
    'ref':'good',
    'will':'good',
    'hp':8,
    'skills':6
  };
  
  function Level(index, name, bab, fort, ref, will, hp, skills){
    this.index = index;
    this.name = name.toLowerCase();
    this.bab = bab;
    this.fort = fort;
    this.ref = ref;
    this.will = will;
    this.hp = hp;
    this.skills = skills;
  };
  
  $scope.addLevel = function(){
    $scope.character.levels[$scope.addLevelForm.index] = new Level(
    $scope.addLevelForm.index,
    $scope.addLevelForm.name,
    $scope.addLevelForm.bab,
    $scope.addLevelForm.fort,
    $scope.addLevelForm.ref,
    $scope.addLevelForm.will,
    $scope.addLevelForm.hp,
    $scope.addLevelForm.skills);
    $scope.addLevelForm.index = $scope.addLevelForm.index + 1;
  };
  
  $scope.removeLevel = function(index){
    delete $scope.character.levels[index];
  };
  
  //update
  $scope.update = function(){
    //reset
    angular.forEach($scope.character.saves, function(save){
      save.base = 0;
      save.firsthighbonus = 0;
      save.bonuses = {};
    });
    
    //Items
    angular.forEach($scope.character.items, function(item){
      console.log(item.effects);
      angular.forEach(item.effects, function(effect){
        console.log(effect);
        angular.forEach($scope.character.saves, function(target){
          if(target.name == effect.target){target.bonuses[effect.type] = new Bonus(item.name, effect.type, effect.value)};
        });
      });
    });
    
    //Attributes
    angular.forEach($scope.character.attributes, function(item){
      item.value = item.basevalue + item.bonus;
      item.mod = parseInt((item.value - 10)/2);
    });
    
    //Skills
    angular.forEach($scope.character.skills, function(item){
      item.statbonus = $scope.character.attributes[item.attribute].mod;
      item.value = item.base + item.statbonus + item.bonus;
    });
    
    //Saves
    //get save base values from levels
    angular.forEach($scope.character.levels, function(level){
      angular.forEach($scope.character.saves, function(save){
        if(level[save.name] == 'good'){
          $scope.character.saves[save.name].base += 0.5;
          //console.log('level ' + level.index + ' has good ' + save.name + ' save');
          save.firsthighbonus = 2;
        } else {
          $scope.character.saves[save.name].base += 0.34;
          //console.log('level ' + level.index + ' has bad ' + save.name + ' save');
        };
      });
    });
    //calculate save bonus
    angular.forEach($scope.character.saves, function(save){
      save.bonus = 0;
      angular.forEach(save.bonuses, function(bonus){
        save.bonus += bonus.value;
      });
      save.statbonus = $scope.character.attributes[save.attribute].mod;
      if(save.firsthighbonus){save.base += save.firsthighbonus};
      save.value = parseInt(save.base) + save.statbonus + save.bonus;
      //console.log(save.name + ' base value is ' + parseInt(save.base));
    });
  };
  
  $scope.$watch('character', function(){$scope.update()},true);
}]);