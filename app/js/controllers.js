"use strict";
var csControllers = angular.module('csControllers', []);

csControllers.controller('characterCtrl', ['$scope', 'LocalStorageService', '$location', function($scope, LocalStorageService, $location){
  $scope.character = {};
  

  //save character
  $scope.saveCharacter = function(){
    LocalStorageService.save('character', $scope.character);
    console.log("character saved");
  };
  //load character
  $scope.loadCharacter = function(){
    var testChar = $scope.character;
    //console.log(testChar);
    var loadedChar = LocalStorageService.load('character');
    //console.log(loadedChar);
    angular.forEach(testChar, function(value, key){
      //console.log(key);
      if(!loadedChar[key]){
        //console.log(key + ' not found in save data, loading default');
        loadedChar[key] = value;
        //console.log(loadedChar.key);
      } else {
        //console.log(key + ' found in save data');
      };
    });
    $scope.character = loadedChar;
    //console.log("character loaded");
  };
  //delete save
  $scope.deleteSave = function(){
    LocalStorageService.clear('character');
    console.log("save data cleared");
  };
  
  //list of bonus types
  $scope.bonusTypes = ['alchemical', 'armor', 'circumstance', 'competence', 'deflection', 'dodge', 'enhancement', 'inherent', 'insight', 'luck', 'morale', 'natural armor', 'profane', 'racial', 'resistance', 'sacred', 'shield', 'size', 'trait', 'untyped'];
  
  //bonuses
  function Bonus(source, type, value){
    this.type = type;
    this.source = source;
    this.value = value;
  };
  
  //functions
  $scope.calculateBonuses = function(item){
    item.bonus = 0;
    angular.forEach(item.bonuses, function(bonus){
      item.bonus += bonus.value;
    });
  };
  
  //effects
  $scope.addEffectForm = {};
  $scope.addEffectForm.value = 0;
  function Effect(targetgroup, target, type, value){
    this.targetgroup = targetgroup;
    this.target = target;
    this.type = type;
    this.value = value;
  };
  $scope.addEffect = function(targetgroup, target, type, value, source){
    source.effects[target] = new Effect(targetgroup, target, type.toLowerCase(), value);
    $scope.addEffectForm = {};
    $scope.addEffectForm.value = 0;
  };
  $scope.removeEffect = function(collection, target){
    delete collection[target];
  };
  
  $scope.effectgroups = [
    {name:'attributes'},
    {name:'saves'},
    {name:'movement'},
    {name:'offense'},
    {name:'defense'}
  ];
  
  //items
  $scope.character.items = {};$scope.character.test = {};
  function Item(name){
    this.name = name;
    this.effects = {};
    this.active = true;
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
    this.bonuses = {};
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
  
  //speed
  $scope.character.movement = {};
  function Speed(name, basevalue, index){
    this.name = name;
    this.basevalue = basevalue;
    this.value = 0;
    this.bonus = 0;
    this.bonuses = {};
    this.index = index;
  };
  
  var speeds = [
    {name:'land', basevalue:30, index:1},
    {name:'fly', basevalue:0, index:2},
    {name:'tele', basevalue:0, index:3},
    {name:'swim', basevalue:0, index:4},
    {name:'climb', basevalue:0, index:5}
  ];
  
  angular.forEach(speeds, function(item){
    $scope.character.movement[item.name] = new Speed(item.name, item.basevalue, item.index);
  });
  
  //offense
  $scope.character.offense = {};
  $scope.character.offense.bab = {
    "name": "bab",
    "value": 0
  };
  $scope.character.offense.cmb = {
    "name": "cmb",
    "value": 0,
    "bonus": 0,
    "bonuses": {}
  };
  
  function Attack(name){
    this.name = name;
    this.value = 0;
    this.bonus = 0;
    this.bonuses = {};
  };
  $scope.character.offense.attack = new Attack("attack")
  
  
  //defense
  $scope.character.defense = {};
  $scope.character.defense.cmd = {
    "name": "cmd",
    "value": 0,
    "bonus": 0,
    "bonuses": {},
    "index": 4
  };
  
  function AC(name, attribute, index){
    this.name = name;
    this.attribute = attribute;
    this.base = 10;
    this.value = 0;
    this.bonus = 0;
    this.bonuses = {};
    this.index = index;
  };
  $scope.character.defense.ac = new AC('ac', 'dexterity', 1);
  $scope.character.defense.touch = new AC('touch', 'dexterity', 2);
  $scope.character.defense.ff = new AC('ff', 'dexterity', 3);
  
  //update
  $scope.$watch('character', function(){$scope.update()},true);
  
  $scope.update = function(){
    //console.log('update started');
    //reset
    angular.forEach($scope.character.saves, function(save){
      save.base = 0;
      save.firsthighbonus = 0;
      save.bonus = 0;
      save.bonuses = {};
    });
    angular.forEach($scope.character.attributes, function(attr){
      attr.bonus = 0;
      attr.bonuses = {};
    });
    angular.forEach($scope.character.movement, function(speed){
      speed.bonus = 0;
      speed.bonuses = {};
    });
    angular.forEach($scope.character.defense, function(defense){
      defense.bonus = 0;
      defense.bonuses = {};
    });
    angular.forEach($scope.character.offense, function(offense){
      offense.bonus = 0;
      offense.bonuses = {};
    });
    
    //Items
    angular.forEach($scope.character.items, function(item){
      //console.log(item.effects);
      if(item.active == true){
        angular.forEach(item.effects, function(effect){
          //console.log(effect);
          if(!$scope.character[effect.targetgroup][effect.target].bonuses[effect.type]){
            $scope.character[effect.targetgroup][effect.target].bonuses[effect.type] = new Bonus(item.name, effect.type, effect.value);
          } else if($scope.character[effect.targetgroup][effect.target].bonuses[effect.type].type == 'dodge' || 
          $scope.character[effect.targetgroup][effect.target].bonuses[effect.type].type == 'untyped'){
            $scope.character[effect.targetgroup][effect.target].bonuses[effect.type].value += effect.value;
          }
        });
      };
    });
    
    //Attributes
    angular.forEach($scope.character.attributes, function(attribute){
      //attribute.bonus = 0;
      $scope.calculateBonuses(attribute);
      attribute.value = attribute.basevalue + attribute.bonus;
      attribute.mod = parseInt((attribute.value - 10)/2);
    });
    
    //Skills
    angular.forEach($scope.character.skills, function(item){
      item.statbonus = $scope.character.attributes[item.attribute].mod;
      item.value = item.ranks + item.statbonus + item.bonus;
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
      //save.bonus = 0;
      $scope.calculateBonuses(save);
      save.statbonus = $scope.character.attributes[save.attribute].mod;
      if(save.firsthighbonus){save.base += save.firsthighbonus};
      save.value = parseInt(save.base) + save.statbonus + save.bonus;
      //console.log(save.name + ' base value is ' + parseInt(save.base));
    });
    
    //movement
    angular.forEach($scope.character.movement, function(speed){
      //speed.bonus = 0;
      $scope.calculateBonuses(speed);
      speed.value = speed.basevalue + speed.bonus;
    });
    
    //offense
      //BAB
      $scope.character.offense.bab.value = 0;
      angular.forEach($scope.character.levels, function(level){
        //console.log(level.index);
        switch(level["bab"]){
          case "good":
            $scope.character.offense.bab.value += 1;
            break;
          case "medium":
            $scope.character.offense.bab.value += 0.75;
            break;
          default:
            $scope.character.offense.bab.value += 0.5;
        };
      });
      
      //attack
      $scope.character.offense.attack.value = 0;
      $scope.calculateBonuses($scope.character.offense.attack);
      $scope.character.offense.attack.value =
        $scope.character.offense.bab.value +
        $scope.character.offense.attack.bonus +
        $scope.character.attributes.strength.mod;
      
      //CMB
      $scope.calculateBonuses($scope.character.offense.cmb);
      $scope.character.offense.cmb.value = $scope.character.offense.bab.value + $scope.character.attributes.strength.mod + $scope.character.offense.cmb.bonus;
    
    //defense
      //AC
      $scope.calculateBonuses($scope.character.defense.ac);
      $scope.character.defense.ac.value =
        $scope.character.defense.ac.base + 
        $scope.character.defense.ac.bonus + 
        $scope.character.attributes[$scope.character.defense.ac.attribute].mod;
      
      //touch
      angular.copy($scope.character.defense.ac.bonuses, $scope.character.defense.touch.bonuses);
      var touchBonuses = ['armor','shield','natural armor']
      angular.forEach($scope.character.defense.touch.bonuses, function(bonus){
        //if(bonus.type == 'armor' || bonus.type == 'shield' || bonus.type == 'natural armor'){
        if(touchBonuses.indexOf(bonus.type) > -1){
          delete $scope.character.defense.touch.bonuses[bonus.type];
        };
      });
      $scope.calculateBonuses($scope.character.defense.touch);
      $scope.character.defense.touch.value =
        $scope.character.defense.touch.base + 
        $scope.character.defense.touch.bonus + 
        $scope.character.attributes[$scope.character.defense.touch.attribute].mod;
        
      //ff
      angular.copy($scope.character.defense.ac.bonuses, $scope.character.defense.ff.bonuses);
      delete $scope.character.defense.ff.bonuses['dodge'];
      $scope.calculateBonuses($scope.character.defense.ff);
      $scope.character.defense.ff.value =
        $scope.character.defense.ff.base + 
        $scope.character.defense.ff.bonus;
      
      //CMD
      $scope.character.defense.cmd.value = $scope.character.defense.touch.value + $scope.character.attributes.strength.mod + $scope.character.offense.bab.value;
    
    //console.log('update finished');
  };
  
  $scope.isActive = function (viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };
}]);