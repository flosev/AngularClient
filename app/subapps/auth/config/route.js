/**
 * route
 *
 * @module      authApp
 * @category    config
 * @author      Bondarenko Victor (MReal) <mreal.victor@gmail.com>
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */

/**
 * route
 */
angular.module('authApp').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/login/signInForm.html',
            controller: 'auth.SignInCtrl',
        }).
        otherwise({
            redirectTo: '/'
        });
}]);