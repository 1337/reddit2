# http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!"

require.config
    baseUrl: ''
    paths:
        'app': 'js/app'
        'controllers': 'js/controllers'
        'directives': 'js/directives'
        'routes': 'js/routes'
        'services': 'js/services'

        'angular': 'components/angular/angular'
        'angular-resource': 'components/angular-resource/angular-resource'
        'angular-route': 'components/angular-route/angular-route'
        'bootstrap': 'components/bootstrap/dist/js/bootstrap.min'
        'imagesloaded': 'components/imagesloaded/imagesloaded.pkgd.min'
        'jquery': 'components/jquery/dist/jquery.min'
        'underscore': 'components/underscore/underscore-min'

    shim:
        'app':
            deps: ['angular']
        'angular':
            exports: 'angular'
        'angular-resource':
            deps: ['angular']
        'angular-route':
            deps: ['angular']
        'bootstrap':
            deps: ['jquery']
        'imagesloaded':
            exports: 'imagesLoaded'
        'underscore':
            exports: '_'

    priority: ['angular']
    deps: ['app']

# start the app
require ['angular', 'app', 'routes'], (angular, app) ->
    # $html = angular.element(document.getElementsByTagName('html')[0])
    angular.element().ready ->
        angular.resumeBootstrap([app['name']])