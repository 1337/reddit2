define ['angular', 'jquery'], (angular, $) ->

    module = angular.module 'Reddit2.controllers', ['Reddit2.services']

    module.controller 'HomeController', ['$scope', ($scope) ->
        $scope.name = 'Reddit'
    ]

    module.controller "FeedController", ['$scope', 'Reddit', ($scope, Reddit) ->
        $scope.reddit = new Reddit()

        # string if image url, or undefined
        $scope.getImageUrl = (url) ->
            if 'imgur' in url
                if '.' not in url[-5..]  # no extension
                    url = url + '.jpg'
                url

            if 'gfycat' in url
                url

            extension = url[-3..]
            if extension in ['jpg', 'gif', 'png']
                url

        console.debug 'reddit initialised'
    ]