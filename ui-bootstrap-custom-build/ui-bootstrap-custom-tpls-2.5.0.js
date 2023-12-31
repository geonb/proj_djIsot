/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.5.0 - 2017-01-28
 * License: MIT
 */angular.module("ui.bootstrap", ["ui.bootstrap.tpls","ui.bootstrap.carousel"]);
angular.module("ui.bootstrap.tpls", ["uib/template/carousel/carousel.html","uib/template/carousel/slide.html"]);
angular.module('ui.bootstrap.carousel', [])

.controller('UibCarouselController', ['$scope', '$rootScope', '$element', '$interval', '$timeout', '$animate', function ($scope, $rootScope, $element, $interval, $timeout, $animate) {
  var self = this,
    slides = self.slides = $scope.slides = [],
    SLIDE_DIRECTION = 'uib-slideDirection',
    currentIndex = $scope.active,
    currentInterval, isPlaying;

  var destroyed = false;
  $element.addClass('carousel');

  self.addSlide = function(slide, element) {
    slides.push({
      slide: slide,
      element: element
    });
    slides.sort(function(a, b) {
      return +a.slide.index - +b.slide.index;
    });
    //if this is the first slide or the slide is set to active, select it
    if (slide.index === $scope.active || slides.length === 1 && !angular.isNumber($scope.active)) {
      if ($scope.$currentTransition) {
        $scope.$currentTransition = null;
      }

      currentIndex = slide.index;
      $scope.active = slide.index;
      setActive(currentIndex);
      self.select(slides[findSlideIndex(slide)]);
      if (slides.length === 1) {
        $scope.play();
      }
    }
  };

  self.getCurrentIndex = function() {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide.index === currentIndex) {
        return i;
      }
    }
  };

  self.next = $scope.next = function () {
            var newIndex = (self.getCurrentIndex() + 1) % slides.length;
            $rootScope.storeProj.slideID = newIndex;
            $('.view1').trigger('resize');
            func_dCol();
            $('.descrCL').css('outline', '0');
            $('.descrCL').css('outline-offset', '-2px');

            $('#tmplID_' + $rootScope.storeProj.slides[newIndex].tmp + '_' + newIndex).css('outline', '5px auto -webkit-focus-ring-color');
            $('#tmplID_' + $rootScope.storeProj.slides[newIndex].tmp + '_' + newIndex).css('outline-offset', '-2px');

            $('.templCL').css('outline', '0');
            $('.templCL').css('outline-offset', '-2px');

            $('#Templ' + ($rootScope.storeProj.slides[newIndex].tmp + 1) + '_' + newIndex).css('outline', '5px auto -webkit-focus-ring-color');
            $('#Templ' + ($rootScope.storeProj.slides[newIndex].tmp + 1) + '_' + newIndex).css('outline-offset', '-2px');
			
			$('#optionID' + ($rootScope.storeProj.slides[self.getCurrentIndex()].tmp) + '_' + self.getCurrentIndex()).css('display', 'none');
            if (newIndex === 0 && $scope.noWrap()) {
                $scope.pause();
                return;
            }
            return self.select(slides[newIndex], 'next');
        };

        self.prev = $scope.prev = function () {
            $('.view1').trigger('resize');
            func_dCol();
            var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;
            $rootScope.storeProj.slideID = newIndex;
            $('.descrCL').css('outline', '0');
            $('.descrCL').css('outline-offset', '-2px');

            $('#tmplID_' + $rootScope.storeProj.slides[newIndex].tmp + '_' + newIndex).css('outline', '5px auto -webkit-focus-ring-color');
            $('#tmplID_' + $rootScope.storeProj.slides[newIndex].tmp + '_' + newIndex).css('outline-offset', '-2px');

            $('.templCL').css('outline', '0');
            $('.templCL').css('outline-offset', '-2px');

            $('#Templ' + ($rootScope.storeProj.slides[newIndex].tmp + 1) + '_' + newIndex).css('outline', '5px auto -webkit-focus-ring-color');
            $('#Templ' + ($rootScope.storeProj.slides[newIndex].tmp + 1) + '_' + newIndex).css('outline-offset', '-2px');
			
			$('#optionID' + ($rootScope.storeProj.slides[self.getCurrentIndex()].tmp) + '_' + self.getCurrentIndex()).css('display', 'none');			
            if ($scope.noWrap() && newIndex === slides.length - 1) {
                $scope.pause();
                return;
            }
            return self.select(slides[newIndex], 'prev');
        };

        self.removeSlide = function (slide) {
            var index = findSlideIndex(slide);

            //get the index of the slide inside the carousel
            slides.splice(index, 1);
            if (slides.length > 0 && currentIndex === index) {
                if (index >= slides.length) {
                    currentIndex = slides.length - 1;
                    $scope.active = currentIndex;
                    setActive(currentIndex);
                    self.select(slides[slides.length - 1]);
                } else {
                    currentIndex = index;
                    $scope.active = currentIndex;
                    setActive(currentIndex);
                    self.select(slides[index]);
                }
            } else if (currentIndex > index) {
                currentIndex--;
                $scope.active = currentIndex;
            }

            //clean the active value when no more slide
            if (slides.length === 0) {
                currentIndex = null;
                $scope.active = null;
            }
        };

        /* direction: "prev" or "next" */
        self.select = $scope.select = function (nextSlide, direction) {
            if ($rootScope.storeProj.chkSCVal == 0) {
                $('.optionCL').css('visibility', 'hidden');
            }
            $rootScope.storeProj.it[self.getCurrentIndex()] = 0;
            var newIndex = findSlideIndex(nextSlide.slide);
			$rootScope.storeProj.slideID = newIndex;
            $('.view1').trigger('resize');
            func_dCol();
            $('.descrCL').css('outline', '0');
            $('.descrCL').css('outline-offset', '-2px');

            $('#tmplID_' + $rootScope.storeProj.slides[newIndex].tmp + '_' + newIndex).css('outline', '5px auto -webkit-focus-ring-color');
            $('#tmplID_' + $rootScope.storeProj.slides[newIndex].tmp + '_' + newIndex).css('outline-offset', '-2px');

            $('.templCL').css('outline', '0');
            $('.templCL').css('outline-offset', '-2px');

            $('#Templ' + ($rootScope.storeProj.slides[newIndex].tmp + 1) + '_' + newIndex).css('outline', '5px auto -webkit-focus-ring-color');
            $('#Templ' + ($rootScope.storeProj.slides[newIndex].tmp + 1) + '_' + newIndex).css('outline-offset', '-2px');
			
			$('#optionID' + ($rootScope.storeProj.slides[self.getCurrentIndex()].tmp) + '_' + self.getCurrentIndex()).css('display', 'none');
            //Decide direction if it's not given
            if (direction === undefined) {
                direction = newIndex > self.getCurrentIndex() ? 'next' : 'prev';
            }
            //Prevent this user-triggered transition from occurring if there is already one in progress
            if (nextSlide.slide.index !== currentIndex &&
                !$scope.$currentTransition) {
                goNext(nextSlide.slide, newIndex, direction);
            }
			$rootScope.func_iFace($rootScope.storeProj.slides[$rootScope.storeProj.slideID].tmp, $rootScope.storeProj.slideID)
        };

        /* Allow outside people to call indexOf on slides array */
        $scope.indexOfSlide = function (slide) {
            return +slide.slide.index;
        };

        $scope.isActive = function (slide) {
            return $scope.active === slide.slide.index;
        };

        $scope.isPrevDisabled = function () {
            return $scope.active === 0 && $scope.noWrap();
        };

        $scope.isNextDisabled = function () {
            return $scope.active === slides.length - 1 && $scope.noWrap();
        };

  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };

  $element.on('mouseenter', $scope.pause);
  $element.on('mouseleave', $scope.play);

  $scope.$on('$destroy', function() {
    destroyed = true;
    resetTimer();
  });

  $scope.$watch('noTransition', function(noTransition) {
    $animate.enabled($element, !noTransition);
  });

  $scope.$watch('interval', restartTimer);

  $scope.$watchCollection('slides', resetTransition);

  $scope.$watch('active', function(index) {
    if (angular.isNumber(index) && currentIndex !== index) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].slide.index === index) {
          index = i;
          break;
        }
      }

      var slide = slides[index];
      if (slide) {
        setActive(index);
        self.select(slides[index]);
        currentIndex = index;
      }
    }
  });

  function getSlideByIndex(index) {
    for (var i = 0, l = slides.length; i < l; ++i) {
      if (slides[i].index === index) {
        return slides[i];
      }
    }
  }

  function setActive(index) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].slide.active = i === index;
    }
  }

  function goNext(slide, index, direction) {
    if (destroyed) {
      return;
    }

    angular.extend(slide, {direction: direction});
    angular.extend(slides[currentIndex].slide || {}, {direction: direction});
    if ($animate.enabled($element) && !$scope.$currentTransition &&
      slides[index].element && self.slides.length > 1) {
      slides[index].element.data(SLIDE_DIRECTION, slide.direction);
      var currentIdx = self.getCurrentIndex();

      if (angular.isNumber(currentIdx) && slides[currentIdx].element) {
        slides[currentIdx].element.data(SLIDE_DIRECTION, slide.direction);
      }

      $scope.$currentTransition = true;
      $animate.on('addClass', slides[index].element, function(element, phase) {
        if (phase === 'close') {
          $scope.$currentTransition = null;
          $animate.off('addClass', element);
        }
      });
    }

    $scope.active = slide.index;
    currentIndex = slide.index;
    setActive(index);

    //every time you change slides, reset the timer
    restartTimer();
  }

  function findSlideIndex(slide) {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].slide === slide) {
        return i;
      }
    }
  }

  function resetTimer() {
    if (currentInterval) {
      $interval.cancel(currentInterval);
      currentInterval = null;
    }
  }

  function resetTransition(slides) {
    if (!slides.length) {
      $scope.$currentTransition = null;
    }
  }

  function restartTimer() {
    resetTimer();
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval > 0) {
      currentInterval = $interval(timerFn, interval);
    }
  }

  function timerFn() {
    var interval = +$scope.interval;
    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
      $scope.next();
    } else {
      $scope.pause();
    }
  }
}])

.directive('uibCarousel', function() {
  return {
    transclude: true,
    controller: 'UibCarouselController',
    controllerAs: 'carousel',
    restrict: 'A',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/carousel.html';
    },
    scope: {
      active: '=',
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    }
  };
})

.directive('uibSlide', ['$animate', function($animate) {
  return {
    require: '^uibCarousel',
    restrict: 'A',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'uib/template/carousel/slide.html';
    },
    scope: {
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      element.addClass('item');
      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        $animate[active ? 'addClass' : 'removeClass'](element, 'active');
      });
    }
  };
}])

.animation('.item', ['$animateCss',
function($animateCss) {
  var SLIDE_DIRECTION = 'uib-slideDirection';

  function removeClass(element, className, callback) {
    element.removeClass(className);
    if (callback) {
      callback();
    }
  }

  return {
    beforeAddClass: function(element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element,
          directionClass + ' ' + direction, done);
        element.addClass(direction);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      if (className === 'active') {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction === 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element, directionClass, done);

        $animateCss(element, {addClass: directionClass})
          .start()
          .done(removeClassFn);

        return function() {
          stopped = true;
        };
      }
      done();
    }
  };
}]);

angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("uib/template/carousel/carousel.html",
        '<div class="carousel-inner" ng-transclude></div> <a role="button" href class="left carousel-control" ng-click="prev()" ng-class="{ disabled: isPrevDisabled() }" ng-show="slides.length > 1"> <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span> <span class="sr-only">previous</span> </a> <a role="button" href class="right carousel-control" ng-click="next()" ng-class="{ disabled: isNextDisabled() }" ng-show="slides.length > 1">  <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>  <span class="sr-only">next</span>  </a>  <ol class="carousel-indicators" style="visibility:hidden" ng-show="slides.length > 1">  <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" id="cslide_{{$index}}" ng-click="select(slide)"> <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>  </li>  </ol> "');
}]);

angular.module("uib/template/carousel/slide.html", []).run(["$templateCache", function ($templateCache) {
   $templateCache.put("uib/template/carousel/slide.html",
        '<div class="text-center" ng-transclude></div>"');
}]);

angular.module('ui.bootstrap.carousel').run(function () {
    !angular.$$csp().noInlineStyle && !angular.$$uibCarouselCss && angular.element(document).find('head').prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>');
    angular.$$uibCarouselCss = true;
});