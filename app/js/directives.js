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

csDirectives.directive('d3js', function(){
  return {
    restrict: "A",
    template: '<script src="./js/vendor/d3.v3.min.js"></script>',
    link: function(scope, element, attrs){
      var dataset = [];                        //Initialize empty array
      for (var i = 0; i < 25; i++) {           //Loop 25 times
          var newNumber = Math.random() * 30;  //New random number (0-30)
          dataset.push(newNumber);             //Add new number to array
      }
      d3.select("#d3js").selectAll("div")
        .data(dataset)  // <-- The answer is here!
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        var barHeight = d * 5;
        return barHeight + "px";
    });
      /*console.log(scope.character);
      var attributes = [];
      angular.forEach(scope.character.attributes, function(attribute){
        attributes.push(attribute.value);
      });
      console.log(attributes);*/
    }
  }
});