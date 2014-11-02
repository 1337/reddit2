define ['angular', 'underscore'], (angular, _) ->
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
            constructor: (@subreddits='funny+pics+wtf+aww+adviceanimals') ->
            items: []
            loading: false
            after: ""
            nextPage: ->
                if @loading
                    return
                @loading = true
                url = "https://reddit.com/r/#{@subreddits}/.json?after=#{@after}&jsonp=JSON_CALLBACK"
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


    # comments fetching
    module.factory "Thread", ['$http', '$sce', ($http, $sce) ->
        class _Thread
            constructor: (permalink) ->
                @comments = []

                if permalink[0] != '/'
                    permalink = '/' + permalink

                @url = "https://reddit.com#{permalink}.json?jsonp=JSON_CALLBACK"
                @fetch()

            fetch: ->
                $http.jsonp(@url).success (resp) =>
                    # tame reddit's lame json format
                    root = resp
                    if resp.length
                        root = resp[1]  # for a direct GET, [0] is the actual post

                    # it is always one of those
                    comments = root?.data?.children or root?.data?.replies

                    # here's me not giving a flying fuck
                    comments = _.sortBy(comments, ((c) ->
                        1e5 - c.data.ups + c.data.downs))

                    @op = resp[0].data.children[0].data
                    @comments = comments

        _Thread
    ]