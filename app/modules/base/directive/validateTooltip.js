

/**
 * validateTooltip
 *
 * validateTooltip directive
 * @constructor
 */
angular.module('base').directive('validateTooltip', ['$window', function ($window) {
    return {
        require: '^form',
        link: function ($scope, elem, attrs, ctrl) {
            'use strict';

            var MIN_WIDTH = 1024,
                watcher;

            $(elem).foundation({
                tooltip: {
                    tip_template : function (selector, content) {
                        return '<span data-selector="' + selector + '" class="'
                            + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
                            + ' validate-tooltip">' + content + '<span class="nub"></span></span>';
                    }
                }
            });

            function rendering() {
                if (getFormField().$dirty && getFormField().$invalid) {
                    $(elem).attr('title', getErrorText());
                    $(elem).foundation('tooltip', 'off',  $(elem));
                    $(elem).foundation('tooltip', 'create',  $(elem));
                    $(elem).foundation('tooltip', 'show',  $(elem));
                }
                else {
                    $(elem).foundation('tooltip', 'off',  $(elem));
                }
            }


            function getFormField() {
                return ctrl[$(elem).attr('name')];
            }


            function getErrorText() {
                var errorText = '';
                angular.forEach($scope.$eval(attrs.errorText), function(text, errorType) {
                    if (!angular.isUndefined(getFormField().$error[errorType])) {
                        errorText = text;
                        return;
                    }
                });
                return errorText;
            }


            function watch() {
                rendering();
                watcher =  $scope.$watchCollection(
                    function() {
                        return getFormField().$error;
                    },
                    function() {
                        rendering();
                    }
                );
            }


            function removeWatch() {
                $(elem).foundation('tooltip', 'off',  $(elem));
                if (angular.isFunction(watcher)) {
                    watcher();
                }
            }

            if ($($window).width() >= MIN_WIDTH) {
                $(elem).on('focus', watch);
                $(elem).on('blur', removeWatch);
                $(elem).attr('data-tooltip', '');
            }
        }
    }
}]);