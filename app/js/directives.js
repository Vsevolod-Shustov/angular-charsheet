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
      var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
      var w = 500;
      var h = 100;
      var barPadding = 1;
      var svg = d3.select("#d3js")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function(d) {
            return h - d*4;  //Height minus data value
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d) {
            return d*4;  //Just the data value
        })
        .attr("x", function(d, i) {
            return i * (w / dataset.length);
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });
      svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("x", function(d, i) {
        return i * (w / dataset.length) + 5;  // +5
   })
   .attr("y", function(d) {
        return h - (d * 4) + 15;              // +15
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    })
    .attr("y", function(d) {
        return h - (d * 4) + 14;  //15 is now 14
    });
      //console.log(scope.character);
      /*var attributes = [];
      angular.forEach(scope.character.attributes, function(attribute){
        attributes.push(attribute.value);
      });
      console.log(attributes);*/
    }
  }
});