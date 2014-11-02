define ['angular', 'jquery'], (angular, $) ->

    module = angular.module 'Reddit2.controllers', ['Reddit2.services']

    # string if image url, or undefined
    getImageUrl = (url) ->
        if 'imgur' in url
            if '.' not in url[-5..]  # no extension
                url = url.replace(/imgur/, 'i.imgur') + '.jpg'
            url

        if 'gfycat' in url
            url

        extension = url[-3..]
        if extension in ['jpg', 'gif', 'png']
            url

    module.controller "FeedController", ['$scope', '$routeParams', 'Reddit', ($scope, $routeParams, Reddit) ->
        subreddits = $routeParams.subreddits
        $scope.reddit = new Reddit(subreddits)
        $scope.getImageUrl = getImageUrl

        console.debug 'reddit initialised'
    ]

    module.controller "ThreadController", ['$scope', '$routeParams', '$sce', 'Thread', ($scope, $routeParams, $sce, Thread) ->
        $scope.thread = new Thread($routeParams.permalink)
        $scope.getImageUrl = getImageUrl

        $scope.safeText = (text="") ->
            text = text.replace(/<!--\w+-->/, '')
            el = $('<div />').html(text)
            $sce.trustAsHtml($(el).text())

        console.debug 'reddit initialised'
    ]