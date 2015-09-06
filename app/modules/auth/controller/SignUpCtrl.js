
/**
 * SignUpCtrl controller
 *
 * @constructor
 */
angular.module('auth').controller('auth.SignUpCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', '$window', 'loginMain', 'REGEX', 'APP_PARAMS',
    function ($rootScope, $scope, $location, $localStorage, $window, loginMain, REGEX, APP_PARAMS) {
        'use strict';

        $scope.REGEX = REGEX;
        $scope.token = $localStorage.token;

        $scope.signUp = signUp;
        $scope.savepassword = savepassword;


        function signUp() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            loginMain.signup(formData, function (res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $localStorage.token = res.user.token;
                    localStorage.token = $localStorage.token;
                    $localStorage.userinfo = JSON.stringify(res.user);
                    localStorage.userinfo = $localStorage.userinfo;
                    $window.location.href = "/index.html";
                }
            }, function (res) {
                $scope.action = res._message;
                $rootScope.error = 'Failed to signup';
            })
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