

/**
 * Password Verify
 *
 * passwordVerify directive
 * @constructor
 */
angular.module('base').directive('passwordVerify', function () {
    'use strict';
    var PRISTINE_CLASS = 'ng-pristine',
        DIRTY_CLASS = 'ng-dirty';

    return {
        require: '^ngModel',
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs.passwordVerify, function(password) {
                validate(password, ctrl.$viewValue);
                //ctrl.$dirty = true;
                //ctrl.$pristine = false;
                //elem.removeClass(PRISTINE_CLASS);
                //elem.addClass(DIRTY_CLASS);
            });

            ctrl.$parsers.unshift(function (password) {
                var password2 = scope.$eval(attrs["passwordVerify"]);
                return validate(password, password2);
            });

            var validate = function(password, password2) {
                var validity =  (password === password2);
                ctrl.$setValidity('passwordVerify', validity);
                return (validity)? password : "undefined";
            }
        }
    }
});