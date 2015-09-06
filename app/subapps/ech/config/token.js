/**
 * token
 *
 * @module      echApp
 * @category    config
 * @author      ****
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */

/**
 * token
 */
angular.module('echApp').config(['$httpProvider', function($httpProvider) {
    'use strict';

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$window', function ($q, $location, $localStorage, $window) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                $localStorage.token = localStorage.token;
                if ($localStorage.token) {
                    config.headers["x-user-token"] = $localStorage.token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 403) {
                    $window.location.href = "/login.html";
                }
                return $q.reject(response);
            }
        };
    }]);
}]);