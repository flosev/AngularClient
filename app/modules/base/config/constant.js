/**
 *
 * constant
 */
angular.module('base').
    constant('REGEX', {
        EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        NUMBER_SPACE: /^[0-9\s]+$/,
        NUMBER_DASH: /^[0-9\-]+$/,
        CVV_REGEXP: /^[0-9]{3,4}$/,
        NUMBER: /^[0-9]+$/,
        NUMBER_NOT_NULL: /^[1-9][0-9]*$/,
        FLOAT_NOT_NULL: /(^[1-9][0-9]*$)|(^[1-9][0-9]*\.?[0-9]+$)|(^0\.[0-9]*[1-9]+[0-9]*$)/
    });