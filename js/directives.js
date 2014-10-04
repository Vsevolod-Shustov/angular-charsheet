"use strict";
var csDirectives = angular.module('csDirectives', []);

csDirectives.directive('spinner', function(){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      element.on('click', function(){
        this.select();
      });
      element.on("mousewheel", function(e) {
        if(e.originalEvent.wheelDelta > 0) {
          this.value = parseInt(this.value) + 1;
        } else {
          this.value = parseInt(this.value) - 1;
        }
        element.trigger('input');
        return false;
      });
      var arrows = angular.element('<span class="glyphicon glyphicon-resize-vertical"></span>');
      angular.element(arrows).appendTo(element.parent());
    }
  }
});