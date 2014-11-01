define ['angular', 'app'], (angular, app) ->

    module = angular.module 'Reddit2.controllers', ['Reddit2.services']

    module.controller 'HomeController', ['$scope', 'name', ($scope, name) ->
        $scope.name = name
    ]

    app