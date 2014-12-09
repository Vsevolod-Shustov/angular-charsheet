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
      var data = [];
      angular.forEach(scope.character.attributes, function(attribute){
        data.push(
          {
            "label": attribute.name,
            "value": attribute.value
          }
        );
      });
      console.log(data);
      
      var w = 300;
      var h = 300;
      var r = h/2;
      var color = d3.scale.category20();
          
      var vis = d3.select("#d3js").append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
      var pie = d3.layout.pie().value(function(d){return d.value;});

      // declare an arc generator function
      var arc = d3.svg.arc().outerRadius(r);

      // select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
          .attr("fill", function(d, i){
              return color(i);
          })
          .attr("d", function (d) {
              console.log(arc(d));
              return arc(d);
          });

      // add the text
      arcs.append("svg:text").attr("transform", function(d){
        d.innerRadius = r/1.5;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
          return data[i].label.slice(0,3).toUpperCase();
        });
        
      arcs.append("svg:text").attr("transform", function(d){
        d.innerRadius = 0;
        return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
          return data[i].value;
        });
    }
  }
});

csDirectives.directive('modaltoggle', function(){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      element.on('click', function(){
        angular.element("#"+attrs.modal).modal('toggle');
        //console.log(attrs);
      });
    }
  }
});