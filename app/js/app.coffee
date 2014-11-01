define ['angular', 'angular-route', 'angular-resource', 'angular-foundation', 'angular-infinite-scroll'
        'controllers', 'directives', 'services'], (angular) ->

    # update this list if you get this:
    # Uncaught Error: [$injector:modulerr]
    dependencies = [
        'ngResource'
        'ngRoute'
        'infinite-scroll'
        'Reddit2.controllers'
        'Reddit2.directives'
        'Reddit2.services'
    ]

    app = angular.module("Reddit2", dependencies)
    app