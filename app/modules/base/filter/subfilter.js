/**
 * subfilter
 *
 * @module      base
 * @category    filter
 * @author      ***
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */


/**
 * subfilter
 * @constructor
 */
angular.module('base').filter('subfilter', function() {
    'use strict';

    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});
