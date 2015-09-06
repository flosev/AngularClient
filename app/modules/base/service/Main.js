


/**
 * Main
 * @constructor
 */
angular.module('base').factory('Main', [
    '$http', '$rootScope', '$localStorage', 'APP_PARAMS',
    function ($http, $rootScope, $localStorage, APP_PARAMS) {
        'use strict';

        var baseUrl = APP_PARAMS.urlApi;
        $rootScope.baseUrl = baseUrl;

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
        }//это нужно для changeUser()
        //var currentUser = getUserFromToken();

        var configReq = {
            headers: {
                'Accept-Language': 'en_US'
            }/*,
             data: {grant_type: 'client_credentials'}*/
        };
        return {

            myaccount: function () {
                var promise = $http.get(baseUrl + '/companies').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            getusersdata: function () {
                var promise = $http.get(baseUrl + '/users').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            myversion: function () {
                var promise = $http.get(baseUrl + '/version').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },

            getmycompanydata: function () {
                var promise = $http.get(baseUrl + '/companies').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            sendrequest: function (data, success, error) {
                $http(data).success(success).error(error);

            },

            edituser: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            mycompany: function () {
                var promise = $http.get(baseUrl + '/companies').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            dashboardchart: function () {
                var promise = $http.get(baseUrl + '/stats').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            dashboardrecent: function () {
                var promise = $http.get(baseUrl + '/charges/?limit=15').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        //console.log(res);
                        //console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },

            paymentsCharges: function () {
                var promise = $http.get(baseUrl + '/charges').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        //$localStorage.char=res;
                        return res;

                        console.log('charge');
                        console.log(res);
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            chargedetails: function (data, success, error) {

                $http(data).success(success).error(error);
                //debugger;
            },
            paymentsSubscriptions: function () {
                var promise = $http.get(baseUrl + '/subscriptions').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            addnewsubscriptions: function (data, success, error) {
                $http(data).success(success).error(error);
                //debugger;
            },
            customers: function () {
                var promise = $http.get(baseUrl + '/customers').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            addnewcustomers: function (data, success, error) {
                $http(data).success(success).error(error);
                //$http.get(baseUrl+'/customers', configReq).success(success).error(error)
            },
            connectedgateways: function () {
                var promise = $http.get(baseUrl + '/gateways').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        //console.log(res);
                        //console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            addnewgateways: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            deletegateways: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            editgateways: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            testgateways: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            currentnotifications: function () {
                var promise = $http.get(baseUrl + '/notifications').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            addnewnotifications: function () {
                var promise = $http.get(baseUrl + '/notifications').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            billingplan: function () {
                var promise = $http.get(baseUrl + '/companies').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            billingpaydetails: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            billingupgrade: function (data, success, error) {
                $http(data).success(success).error(error);
            },
            billingdetails: function () {
                var promise = $http.get(baseUrl + '/companies').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },

            billinghistory: function () {
                var promise = $http.get(baseUrl + '/companies?action=history').success(function (res) {
                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        console.log(res);
                        console.log('in service');
                        return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
                return promise;
            },
            /*billinghistdetails: function(data, success, error) {
             $http(data).success(success).error(error);
             },*/
            logout: function (success) {
                //changeUser({});  как определить  localUser, которого нужно поменять
                delete $localStorage.token;
                delete localStorage['ngStorage-token'];
                delete localStorage.token;
                delete $localStorage.userinfo;
                //delete localStorage['ngStorage-token'];
                delete localStorage.userinfo;
                success();
            }

        }
    }]);