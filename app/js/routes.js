// Generated by CoffeeScript 1.7.1
(function() {
  define(['angular', 'app'], function(angular, app) {
    app.config([
      "$routeProvider", function($routeProvider) {
        $routeProvider.when("/home", {
          templateUrl: "partials/home.html",
          controller: "HomeController"
        });
        return $routeProvider.otherwise({
          redirectTo: "/home"
        });
      }
    ]);
    return app;
  });

}).call(this);