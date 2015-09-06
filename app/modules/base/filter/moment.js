/**
 * moment
 *
 * @module      base
 * @category    filter
 * @author      ***
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */


/**
 * moment
 * @constructor
 */
angular.module('base').filter('moment', function() {
    'use strict';

    return function(dateString, format) {
        return moment(dateString).format(format);
    };
});
