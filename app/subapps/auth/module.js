/**
 * Constructor to module the loginApp
 *
 * @module      loginApp
 * @category    module
 * @author      Bondarenko Victor (MReal) <mreal.victor@gmail.com>
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */

/**
 * module loginApp
 *
 * @constructor
 */
angular.module('authApp', [
    'ngRoute',
    'ngStorage',
    'ngResource',
    'auth',
    'base',
]);