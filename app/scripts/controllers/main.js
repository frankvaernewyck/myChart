'use strict';

/**
 * @ngdoc function
 * @name myChartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myChartApp
 */
angular.module('myChartApp')

 .controller('MainCtrl', ['$scope', '$interval',
     function($scope, $interval){

         var time = new Date ('2014-01-01 00:00:00 +0100');

         var randPoint = function(){
             var rand = Math.random;
             return {time:time.getSeconds(), visitors:rand()*100};
         }

         $scope.logs = [randPoint()];

         $interval(function(){
             time.setSeconds(time.getSeconds()+1);
             $scope.logs.push(randPoint());
         }, 1000);
     }
 ]);
