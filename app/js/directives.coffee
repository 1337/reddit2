define ['angular', 'services'], (angular, services) ->
    module = angular.module 'Reddit2.directives', ['Reddit2.services']

    module.directive 'appName', ['name', (name) ->
        (scope, elm, attrs) -> elm.text(name)
    ]