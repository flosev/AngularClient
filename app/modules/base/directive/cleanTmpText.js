

/**
 * cleanTmpText
 *
 * cleanTmpText directive
 * @constructor
 */
angular.module('base').directive('cleanTmpText',['$timeout', '$document', function ($timeout, $document) {
    return {
        scope: {
            cleanTmpText: '=',
            delay: '@',
            duration: '@',
            animateType: '@'
        },
        link: function ($scope, elem, attrs, ctrl) {
            'use strict';

            var animateShow = {},
                animateHide = {},
                iShowing =  false;

            var delay = (angular.isUndefined($scope.delay))? 10000 : $scope.delay;
            var duration = (angular.isUndefined($scope.duration))? 0 : $scope.duration;
            animateShow[(angular.isUndefined($scope.animateType))? 'opacity' : $scope.animateType] = 'show';
            animateHide[(angular.isUndefined($scope.animateType))? 'opacity' : $scope.animateType] = 'hide';

            function show() {
                elem.text($scope.cleanTmpText);
                $(elem).animate(animateShow, duration);
                iShowing = true;
            }

            function hide() {
                if (iShowing) {
                    $(elem).animate(animateHide, duration);
                    iShowing = false;
                    $scope.cleanTmpText = '';
                }
            }

            $scope.$watch('cleanTmpText', function(value) {
                if (value != '') {
                    show();
                    $timeout(hide, delay);
                }
            });

            $($document).on('keydown', 'input, textarea, select', hide);
        }
    }
}]);