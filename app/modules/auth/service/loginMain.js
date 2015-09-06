/**
 * loginMain
 * @constructor
 */
angular.module('auth').factory('loginMain', [
    '$http', '$rootScope', '$localStorage', 'APP_PARAMS',
    function ($http, $rootScope, $localStorage, APP_PARAMS) {
        'use strict';

        var baseUrl = APP_PARAMS.urlApi+"";
        var sendUrl = APP_PARAMS.urlApi+"";

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        //это нужно для changeUser()
        //var currentUser = getUserFromToken();

        var configReq = {
            headers: {
                'Accept-Language': 'en_US'
            }/*,
             data: {grant_type: 'client_credentials'}*/
        };
        return {
            login: function (data, success, error) {
                $http.post(baseUrl + '/auth', data).success(success).error(error)
            },
            signup: function (data, success, error) {
                $http.post(baseUrl + '/users', data).success(success).error(error)
            },
            troubles: function (data, success, error) {
                $http.post(baseUrl + '/users?action=resetpassword', data).success(success).error(error)
            },
            savepassword: function (data, success, error) {
                $http(data).success(success).error(error);
            }
        };
    }]);