define ['angular', 'app'], (angular, app) ->
    app.config ["$routeProvider", ($routeProvider) ->
        $routeProvider.when "/home",
            templateUrl: "partials/home.html"
            controller: "HomeController"

        $routeProvider.otherwise redirectTo: "/home"
    ]
    app