// Generated by CoffeeScript 1.7.1
(function() {
  define(['angular', 'app'], function(angular, app) {
    var module;
    module = angular.module('Reddit2.controllers', ['Reddit2.services']);
    module.controller('HomeController', [
      '$scope', 'name', function($scope, name) {
        return $scope.name = name;
      }
    ]);
    return app;
  });

}).call(this);
