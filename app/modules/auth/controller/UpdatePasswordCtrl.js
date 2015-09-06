
/**
 * UpdatePasswordCtrl controller
 *
 * @constructor
 */
angular.module('auth').controller('auth.UpdatePasswordCtrl', [
    '$rootScope', '$scope', '$localStorage', '$window', 'loginMain', 'REGEX', 'APP_PARAMS',
    function ($rootScope, $scope, $localStorage, $window, loginMain, REGEX, APP_PARAMS) {
        'use strict';

        $scope.REGEX = REGEX;
        $scope.token = $localStorage.token;
        $scope.password = '';
        $scope.confPassword = '';

        $scope.updatePassword = savePassword;


        function savePassword() {
            $scope.action = '';
            var hash = window.location.href.split('=')[1];
            var formData = {
                method: 'POST',
                url: APP_PARAMS.urlApi+"/users/?action=resetpassword&password=" + $scope.password + "&password_reminder=" + hash // @TODO The data must be in the body of the request!
            };
            loginMain.savepassword(formData, function (res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $scope.action = 'New password has been saved';
                    $window.location.href = "/login.html";
                }
            }, function (res) {
                console.log(res)
                $scope.action = res._message;
            });
        }

    }]);