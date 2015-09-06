/**
 * RecoveryCtrl controller
 *
 * @constructor
 */
angular.module('auth').controller('auth.RecoveryCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', '$window', 'loginMain', 'REGEX', 'APP_PARAMS',
    function ($rootScope, $scope, $location, $localStorage, $window, loginMain, REGEX, APP_PARAMS) {
        'use strict';

        $scope.REGEX = REGEX;
        $scope.token = $localStorage.token;

        $scope.recovery = recovery;
        $scope.savepassword = savepassword;

        function recovery() {
            $scope.action = '';
            var formData = {
                email: $scope.email,
                "baseurl": "https://asta.envoyrecharge.com/forgot.html#"
            }

            loginMain.troubles(formData, function (res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $scope.action = "Password reset processed. Please check your inbox.";
                }
            }, function (res) {
                $scope.action = res._message + " " + res._errors;
                $rootScope.error = 'Failed to signup';
            });
        }


        function savepassword() {
            if ($scope.confpassword != $scope.newpassword) {
                $scope.action = 'Password doesn\'t match confirmation';
                return;
            }

            $scope.action = '';
            var hash = window.location.href.split('=')[1];
            var formData = {
                method: 'POST',
                url: APP_PARAMS.urlApi+"/users/?action=resetpassword&password=" + $scope.newpassword + "&password_reminder=" + hash
            };
            loginMain.savepassword(formData, function (res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $scope.action = 'New password has been saved';
                    window.location.href = "/login.html";
                }
            }, function (res) {
                $scope.action = res._message;
            });
        }

    }]);