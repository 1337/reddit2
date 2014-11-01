// Generated by CoffeeScript 1.7.1
(function() {
  define(['angular'], function(angular) {
    var module, safeText;
    module = angular.module('Reddit2.services', []);
    safeText = function(text) {
      var el;
      if (text == null) {
        text = "";
      }
      text = text.replace(/<!--\w+-->/, '');
      el = $('<div />').html(text);
      return $(el).text();
    };
    return module.factory("Reddit", [
      '$http', '$sce', function($http, $sce) {
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
                var item, items, _i, _item, _len;
                items = data.data.children;
                for (_i = 0, _len = items.length; _i < _len; _i++) {
                  item = items[_i];
                  _item = item.data;
                  _item.selftext_html = $sce.trustAsHtml(safeText(_item.selftext_html));
                  _this.items.push(_item);
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
