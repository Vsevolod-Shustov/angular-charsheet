"use strict";
var csServices = angular.module('csServices', []);

csServices.service('LocalStorageService', ['$rootScope', function(){
  var service = {
    save: function(key, value){
      localStorage[key] = angular.toJson(value);
    },
    clear: function(key){
      delete localStorage[key];
    },
    load: function(key, value){
      if(localStorage[key]) {
        return angular.fromJson(localStorage[key]);
      } else {
        console.log("No save found, have mock data instead.");
        return mockdata;
      }
    },
    loadmock: function(){
      console.log("loading mock data");
      return mockdata;
    }
  };
  var mockdata = {"items":{},"attributes":{"strength":{"name":"strength","basevalue":12,"bonus":0,"bonuses":{},"value":12,"mod":1,"index":1},"dexterity":{"name":"dexterity","basevalue":14,"bonus":0,"bonuses":{},"value":14,"mod":2,"index":2},"constitution":{"name":"constitution","basevalue":16,"bonus":0,"bonuses":{},"value":16,"mod":3,"index":3},"intelligence":{"name":"intelligence","basevalue":18,"bonus":0,"bonuses":{},"value":18,"mod":4,"index":4},"wisdom":{"name":"wisdom","basevalue":20,"bonus":0,"bonuses":{},"value":20,"mod":5,"index":5},"charisma":{"name":"charisma","basevalue":22,"bonus":0,"bonuses":{},"value":22,"mod":6,"index":6}},"skills":{},"saves":{"fort":{"name":"fort","attribute":"constitution","value":3,"bonus":0,"bonuses":{},"base":0,"index":1,"firsthighbonus":0,"statbonus":3},"ref":{"name":"ref","attribute":"dexterity","value":2,"bonus":0,"bonuses":{},"base":0,"index":2,"firsthighbonus":0,"statbonus":2},"will":{"name":"will","attribute":"wisdom","value":5,"bonus":0,"bonuses":{},"base":0,"index":3,"firsthighbonus":0,"statbonus":5}},"levels":{},"movement":{"land":{"name":"land","basevalue":30,"value":30,"bonus":0,"bonuses":{},"index":1},"fly":{"name":"fly","basevalue":0,"value":0,"bonus":0,"bonuses":{},"index":2},"tele":{"name":"tele","basevalue":0,"value":0,"bonus":0,"bonuses":{},"index":3},"swim":{"name":"swim","basevalue":0,"value":0,"bonus":0,"bonuses":{},"index":4},"climb":{"name":"climb","basevalue":0,"value":0,"bonus":0,"bonuses":{},"index":5}}}
  return service;
}]);