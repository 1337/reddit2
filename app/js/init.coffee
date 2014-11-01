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

        'angular': 'components/angular/angular.min'
        'angular-bootstrap': 'components/angular-bootstrap/ui-bootstrap.min'
        'angular-foundation': 'components/angular-foundation/mm-foundation.min'
        'angular-foundation-tpls': 'components/angular-foundation/mm-foundation-tpls.min'
        'angular-infinite-scroll': 'components/ngInfiniteScroll/build/ng-infinite-scroll'
        'angular-resource': 'components/angular-resource/angular-resource.min'
        'angular-route': 'components/angular-route/angular-route.min'
        'bootstrap': 'components/bootstrap/dist/js/bootstrap.min'
        'foundation': 'components/foundation/js/foundation.min'
        'imagesloaded': 'components/imagesloaded/imagesloaded.pkgd.min'
        'jquery': 'components/jquery/dist/jquery.min'
        'modernizr': 'components/modernizr/modernizr'
        'underscore': 'components/underscore/underscore-min'

    shim:
        'app':
            deps: ['angular']
        'angular':
            deps: ['jquery']  # angular-infinite-scroll uses this
            exports: 'angular'
        'angular-bootstrap':
            deps: ['angular', 'bootstrap']
        'angular-foundation':
            deps: ['angular', 'foundation']
        'angular-foundation-tpls':
            deps: ['angular', 'angular-foundation']
        'angular-infinite-scroll':
            deps: ['angular']  # needs $ to be jquery, not jqlite, for some reason
        'angular-resource':
            deps: ['angular']
        'angular-route':
            deps: ['angular']
        'bootstrap':
            deps: ['jquery']
        'foundation':
            deps: ['jquery']
        'imagesloaded':
            exports: 'imagesLoaded'
        'underscore':
            exports: '_'

    priority: ['angular']
    deps: ['app']

# start the app
require ['angular', 'app', 'modernizr', 'routes'], (angular, app) ->
    # $html = angular.element(document.getElementsByTagName('html')[0])
    angular.element().ready ->
        angular.resumeBootstrap([app['name']])