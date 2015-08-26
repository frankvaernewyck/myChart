'use strict';

  // chart module
angular.module('myChartApp')

// D3 factory
.factory('d3', function(){
  /* We could declare locals or other D3.js specific configurations here. */
  return d3;
})

// scatter chart directive
.directive('myScatterChart', ["d3",
function(d3){

  var draw = function(svg, width, height, data){

    svg
      .attr('width', width)
      .attr('height', height);

      // define a margin
      var margin = 30;

      // define x-scale
      var xScale = d3.time.scale()
        .domain(d3.extent(data, function(d){return d.x; }))
        .range([margin, width-margin]);

      // define x-axis
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('top')
        .tickFormat(d3.format('f'));

      // define y-scale
      var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.y;})])
        .range([margin, height-margin]);

      // define y-axis
      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .tickFormat(d3.format('f'));

      // draw x-axis
      svg.select('.x-axis')
        .attr("transform", "translate(0, " + margin + ")")
        .call(xAxis);

      // draw y-axis
      svg.select('.y-axis')
        .attr("transform", "translate(" + margin + ")")
        .call(yAxis);

      // add the new data points
      svg.select('.data')
        .selectAll('circle').data(data)
        .enter()
        .append('circle');

      // update all data points
      svg.select('.data')
        .selectAll('circle').data(data)
        .attr('r', 2.5)
        .attr('cx', function(d){return xScale(d.x);})
        .attr('cy', function(d){return yScale(d.y);});

  };


  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    compile: function(element, attrs, transclude){
      // create SVG root element
      var svg = d3.select(element[0]).append('svg');

      svg.append('g').attr('class', 'data');
      svg.append('g').attr('class', 'x-axis axis');
      svg.append('g').attr('class', 'y-axis axis');

      // define the dimensions for the chart
      var width = 600, height = 300;

      // return the link function
      return function(scope, element, attrs){
        // watch the data attribute of the scope
        scope.$watch('data', function(newVal, oldVal, scope){

          // map the data to the internal format
          if (scope.data != undefined){
            var data = scope.data.map(function (d){
              return {
                x: d.time,
                y: d.visitors
                };
            });

            // update the chart
            draw(svg, width, height, data);
          };
        }, true);
      };
    }
  };
}]);
