define ['angular'], (angular) ->
    module = angular.module('Reddit2.services', [])

    safeText = (text="") ->
        text = text.replace(/<!--\w+-->/, '')
        el = $('<div />').html(text)
        $(el).text()

    # Reddit constructor function to encapsulate HTTP and pagination logic
    module.factory "Reddit", ['$http', '$sce', ($http, $sce) ->
        # https://binarymuse.github.io/ngInfiniteScroll/demo_async.html
        # (modified)
        class _Reddit
            items: []
            loading: false
            after: ""
            nextPage: ->
                if @loading
                    return
                @loading = true
                url = "http://api.reddit.com/hot?after=#{@after}&jsonp=JSON_CALLBACK"
                $http.jsonp(url).success (data) =>
                    items = data.data.children
                    for item in items
                        _item = item.data
                        _item.selftext_html = $sce.trustAsHtml(safeText(_item.selftext_html))
                        @items.push _item

                    @after = "t3_" + @items[@items.length - 1].id
                    @loading = false

        _Reddit
    ]