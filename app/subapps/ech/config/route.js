/**
 * route
 *
 * @module      echApp
 * @category    config
 * @author      ****
 * @copyright   (http://envoyrecharge.com). All rights reserved.
 * @license     http://envoyrecharge.com Commercial
 * @link        http://envoyrecharge.com/
 */

/**
 * route
 */
angular.module('echApp').config(['$routeProvider', function($routeProvider) {
    'use strict';

    $routeProvider.
        when('/', {
            templateUrl: 'views/dashboard/chart.html',
            controller: 'dashboard.ChartCtrl',
            resolve: {
                dashboardchart: function (Main) {
                    return Main.dashboardchart();
                }
            }
        }).
        otherwise({
            redirectTo: '/'
        });
}]);