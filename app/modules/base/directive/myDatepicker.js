

/**
 * myDatepicker directive
 *
 * @constructor
 */
angular.module('base').directive('myDatepicker',
    function() {
        'use strict';

        return {
            // Restrict it to be an attribute in this case
            restrict: 'A',
            require : 'ngModel',
            // responsible for registering DOM listeners as well as updating the DOM
            link:  function (scope, element, attrs, ngModelCtrl) {
                $(function(){
                    element.datepicker({
                        dateFormat:'yy-mm-dd',
                        onSelect:function (date) {
                            ngModelCtrl.$setViewValue(date);
                            scope.$apply();

                        }
                    });
                });
            }
        };
    });
