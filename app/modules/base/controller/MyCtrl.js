/**
 * MyController controller
 *
 * @constructor
 */
angular.module('base').controller('base.MyController', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main',
    function ($rootScope, $scope, $location, $localStorage, Main, dashboardrecent) {
        'use strict';

        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.meals = [];

        $scope.pageChangeHandler = function (num) {
            console.log('meals page changed to ' + num);
        };
    }]);