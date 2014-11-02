define ['angular', 'app'], (angular, app) ->
    app.config ["$routeProvider", ($routeProvider) ->
        $routeProvider.when "/home",
            templateUrl: "partials/feed.html"
            controller: "HomeController"

        # * = slashes in param: http://stackoverflow.com/a/20064465/1558430
        $routeProvider.when "/thread/:permalink*",
            templateUrl: "partials/thread.html"
            controller: "ThreadController"

        $routeProvider.otherwise redirectTo: "/home"
    ]
    app