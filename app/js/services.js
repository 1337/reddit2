// Generated by CoffeeScript 1.7.1
(function() {
  define(['angular'], function(angular) {
    var module;
    module = angular.module('Reddit2.services', []);
    return module.factory("Reddit", [
      '$http', function($http) {
        var _Reddit;
        _Reddit = (function() {
          function _Reddit() {}

          _Reddit.prototype.items = [];

          _Reddit.prototype.loading = false;

          _Reddit.prototype.after = "";

          _Reddit.prototype.nextPage = function() {
            var url;
            if (this.loading) {
              return;
            }
            this.loading = true;
            url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
            return $http.jsonp(url).success((function(_this) {
              return function(data) {
                var item, items, _i, _len;
                items = data.data.children;
                for (_i = 0, _len = items.length; _i < _len; _i++) {
                  item = items[_i];
                  _this.items.push(item.data);
                }
                _this.after = "t3_" + _this.items[_this.items.length - 1].id;
                return _this.loading = false;
              };
            })(this));
          };

          return _Reddit;

        })();
        return _Reddit;
      }
    ]);
  });

}).call(this);
