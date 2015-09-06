/**
 * EmptyCtrl controller
 *
 * @constructor
 */
angular.module('base').controller('base.EmptyCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main', '$window',
    function ($rootScope, $scope, $location, $localStorage, Main, $window) {
        'use strict';

        $scope.userinfo = localStorage.userinfo;

        var uinf;
        try {
            if ($scope.userinfo && (uinf = JSON.parse($scope.userinfo))) {
                $scope.email = uinf.email;

                $scope.usern = uinf.email;
                if (uinf.first_name || uinf.last_name)$scope.usern = uinf.first_name + ' ' + uinf.last_name;
            }
        }
        catch (err) {
            Main.logout(function () {
                $window.location.href = "/login.html";
            }, function () {
                alert("Failed to logout!");
            });
        }
        if (!uinf) {
            Main.logout(function () {
                $window.location.href = "/login.html";
            }, function () {
                alert("Failed to logout!");
            });
        }

        $scope.options = {
            secure: true,
            size: 100,
            defaultImage: 'retro'
        };
    }]);