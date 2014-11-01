// Generated by CoffeeScript 1.7.1
(function() {
  var should,
    __slice = [].slice;

  should = chai.should();

  describe('Infinite Scroll Throttled to 200ms', function() {
    var $compile, $document, $rootScope, $timeout, THROTTLE_MILLISECONDS, docWindow, fakeWindow, origJq, _ref;
    _ref = [void 0], $rootScope = _ref[0], $compile = _ref[1], docWindow = _ref[2], $document = _ref[3], $timeout = _ref[4], fakeWindow = _ref[5], THROTTLE_MILLISECONDS = _ref[6], origJq = _ref[7];
    beforeEach(function() {
      return module('infinite-scroll', function($provide) {
        $provide.value('THROTTLE_MILLISECONDS', 200);
      });
    });
    beforeEach(function() {
      return inject(function(_$rootScope_, _$compile_, _$window_, _$document_, _$timeout_, _THROTTLE_MILLISECONDS_) {
        var $window;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        $window = _$window_;
        $document = _$document_;
        $timeout = _$timeout_;
        fakeWindow = angular.element($window);
        sinon.stub(fakeWindow, 'last').returns(fakeWindow);
        THROTTLE_MILLISECONDS = _THROTTLE_MILLISECONDS_;
        origJq = angular.element;
        return angular.element = function() {
          var args, first;
          first = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          if (first === $window) {
            return fakeWindow;
          } else {
            return origJq.apply(null, [first].concat(__slice.call(args)));
          }
        };
      });
    });
    afterEach(function() {
      return angular.element = origJq;
    });
    it('waits correct interval between calls to handler', function() {
      var el, i, scope, scroller, _i;
      scroller = "<div infinite-scroll='scroll()' style='height: 1000px'\n  infinite-scroll-immediate-check='false'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      $compile(el)(scope);
      for (i = _i = 0; _i <= 2; i = ++_i) {
        fakeWindow.scroll();
      }
      $timeout.flush();
      scope.scroll.should.have.been.calledTwice;
      el.remove();
      return scope.$destroy();
    });
    it("doesn't duplicate calls", function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()' style='height: 1000px'\n  infinite-scroll-immediate-check='false'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      $compile(el)(scope);
      fakeWindow.scroll();
      $timeout.flush();
      scope.scroll.should.have.been.called.twice;
      el.remove();
      return scope.$destroy();
    });
    it('triggers immediately by default', function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()' style='height: 1000px'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      $compile(el)(scope);
      $timeout.flush();
      scope.scroll.should.have.been.calledOnce;
      el.remove();
      return scope.$destroy();
    });
    it('does not trigger immediately when infinite-scroll-immediate-check is false', function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='1'\n  infinite-scroll-immediate-check='false' style='height: 500px;'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      $compile(el)(scope);
      $timeout.flush();
      scope.scroll.should.not.have.been.called;
      fakeWindow.scroll();
      scope.scroll.should.have.been.calledOnce;
      el.remove();
      return scope.$destroy();
    });
    it('does not trigger when disabled', function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='1'\n  infinite-scroll-disabled='busy' style='height: 500px;'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      scope.busy = true;
      $compile(el)(scope);
      scope.$digest();
      fakeWindow.scroll();
      scope.scroll.should.not.have.been.called;
      el.remove();
      return scope.$destroy();
    });
    it('re-triggers after being re-enabled', function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='1'\n  infinite-scroll-disabled='busy' style='height: 500px;'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      scope.busy = true;
      $compile(el)(scope);
      scope.$digest();
      fakeWindow.scroll();
      $timeout.flush();
      scope.scroll.should.not.have.been.called;
      scope.busy = false;
      scope.$digest();
      $timeout.flush();
      scope.scroll.should.have.been.calledOnce;
      el.remove();
      return scope.$destroy();
    });
    it('only triggers when the page has been sufficiently scrolled down', function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()'\n  infinite-scroll-distance='1' style='height: 10000px'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      sinon.stub(fakeWindow, 'scrollTop').returns(7998);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      $compile(el)(scope);
      scope.$digest();
      fakeWindow.scroll();
      $timeout.flush();
      scope.scroll.should.not.have.been.called;
      fakeWindow.scrollTop.returns(8000);
      fakeWindow.scroll();
      $timeout.flush();
      scope.scroll.should.have.been.calledOnce;
      el.remove();
      return scope.$destroy();
    });
    return it('respects the infinite-scroll-distance attribute', function() {
      var el, scope, scroller;
      scroller = "<div infinite-scroll='scroll()' infinite-scroll-distance='5' style='height: 10000px;'></div>";
      el = angular.element(scroller);
      $document.append(el);
      sinon.stub(fakeWindow, 'height').returns(1000);
      sinon.stub(fakeWindow, 'scrollTop').returns(3998);
      scope = $rootScope.$new(true);
      scope.scroll = sinon.spy();
      $compile(el)(scope);
      scope.$digest();
      fakeWindow.scroll();
      $timeout.flush();
      scope.scroll.should.not.have.been.called;
      fakeWindow.scrollTop.returns(4000);
      fakeWindow.scroll();
      $timeout.flush();
      scope.scroll.should.have.been.calledOnce;
      el.remove();
      return scope.$destroy();
    });
  });

}).call(this);
