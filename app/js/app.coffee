define ['angular', 'angular-route', 'angular-resource', 'controllers', 'directives', 'services'], (angular) ->

    dependencies = [
        'ngResource'
        'ngRoute'
        'Reddit2.controllers'
        'Reddit2.directives'
        'Reddit2.services'
    ]
    app = angular.module("Reddit2", dependencies)

    app