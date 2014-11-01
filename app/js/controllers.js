// Generated by CoffeeScript 1.7.1
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['angular', 'jquery'], function(angular, $) {
    var module;
    module = angular.module('Reddit2.controllers', ['Reddit2.services']);
    module.controller('HomeController', [
      '$scope', function($scope) {
        return $scope.name = 'Reddit';
      }
    ]);
    return module.controller("FeedController", [
      '$scope', 'Reddit', function($scope, Reddit) {
        $scope.reddit = new Reddit();
        $scope.getImageUrl = function(url) {
          var extension;
          if (__indexOf.call(url, 'imgur') >= 0) {
            if (__indexOf.call(url.slice(-5), '.') < 0) {
              url = url + '.jpg';
            }
            url;
          }
          if (__indexOf.call(url, 'gfycat') >= 0) {
            url;
          }
          extension = url.slice(-3);
          if (extension === 'jpg' || extension === 'gif' || extension === 'png') {
            return url;
          }
        };
        return console.debug('reddit initialised');
      }
    ]);
  });

}).call(this);
