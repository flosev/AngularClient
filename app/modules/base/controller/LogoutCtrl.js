/**
 * LogoutCtrl controller
 *
 * @constructor
 */
angular.module('base').controller('base.LogoutCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main', '$window',
    function ($rootScope, $scope, $location, $localStorage, Main, $window) {
        'use strict';

        $scope.logout = function () {
            // $localStorage.token;
            Main.logout(function () {
                //window.location = "#/";
                $window.location.href = "/login.html";
            }, function () {
                alert("Failed to logout!");
            });
        };

        $scope.token = $localStorage.token;
    }]);