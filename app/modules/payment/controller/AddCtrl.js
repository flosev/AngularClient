

/**
 * AddCtrl controller
 *
 * @constructor
 */
angular.module('payment').controller('payment.AddCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main', 'paymentsSubscriptions', 'connectedgateways', 'REGEX',
    function ($rootScope, $scope, $location, $localStorage, Main, paymentsSubscriptions, connectedgateways, REGEX) {
        'use strict';

        $scope.REGEX = REGEX;
        $scope.GATEWAY_TYPE_EZIDEBIT = 'Ezidebit';
        //$scope.myTails = [{name: "3434", _id: 343535}, {name: "3435", _id: 454545}];
        $scope.myTails = connectedgateways.data.resource.data;
        $scope.bsbtabFormVisible = false;
        $scope.resolved = true;
        var allGateways = $scope.myTails;
        //$scope.myCustom= customers.data.resource.data;
        $scope.mySubscr = paymentsSubscriptions.data.resource.data;
        $scope.action = '';
        $scope.class='';

        $scope.selectedGatewayTypeEquivalent = selectedGatewayTypeEquivalent;

        $scope.$watch("interval", function (newValue, oldValue) {
            if (newValue == 'day' || newValue == 'week' || newValue == 'month' || newValue == 'year') {
                $scope.subsFormVisible = true;
                console.log($scope.interval);
            } else {
                $scope.subsFormVisible = false;
            }
        });
        $scope.$watch("gateway_id", function (newValue, oldValue) {
            for (var gateway in allGateways) {
                var innerGateway = allGateways[gateway];
                //var ddd = innerUser.first_name;
                //debugger;
                if (innerGateway._id == newValue) {
                    if (innerGateway.type == 'Ezidebit') {
                        $scope.bsbtabFormVisible = true;
                        console.log($scope.bsbtabFormVisible);
                    } else {
                        $scope.bsbtabFormVisible = false;
                    }
                }
            }
        });
        /*$scope.$watch("gateway_id_type", function(newValue, oldValue) {
         var gateway = $scope.gateway_id_type.split(".");
         var type = gateway[1];
         if (type=='Ezidebit' ){
         $scope.bsbFormVisible=true;
         console.log(type);
         }else{
         $scope.bsbFormVisible=false;
         }
         });*/


        $scope.addnewsubscriptions = function () {
            $scope.resolved = false;

            if ($scope.interval == 'one-off') {
                var suburl = $rootScope.baseUrl + "/charges";
                var sched = {}
            } else {
                var suburl = $rootScope.baseUrl + "/subscriptions";
                var sched = {
                    "frequency": $scope.frequency,
                    "interval": $scope.interval,
                    "start_date": $scope.start_date,
                    "end_date": $scope.end_date
                }
            }
            // console.log($scope.bsbFormVisible);
            if ($scope.bsbFormVisible != true) {
                var formData = {
                    method: 'POST',
                    url: suburl,
                    headers: {},
                    data: {
                        "schedule": sched,
                        "amount": $scope.amount,
                        "currency": $scope.currency,
                        "customer": {
                            "first_name": $scope.first_name,
                            "last_name": $scope.last_name,
                            "email": $scope.email,
                            "payment_source": {
                                "address_line1": $scope.address_line1,//'dfgfdg',
                                "address_line2": $scope.address_line2,//'fghfh',
                                "address_city": $scope.city,//'ghjgdd',
                                "address_state": $scope.state,//'gfhjdghjghj',
                                "address_country": $scope.country,//'gfhfhdg',
                                "address_postcode": $scope.postcode,//'1234',
                                "gateway_id": $scope.gateway_id,//$scope.gateway_id,//"53f79cddcc8d0e6b8a2e8a6c",
                                "card_name": $scope.card_name,//"test user",
                                "card_number": $scope.cardnumber,//"4111111111111111",brain
                                "expire_month": $scope.expire_month,
                                "expire_year": $scope.expire_year,
                                "card_ccv": $scope.ccv//"123"
                            }
                        }
                    }
                }
            } else {
                var formData = {
                    method: 'POST',
                    url: suburl,
                    headers: {},
                    data: {
                        "schedule": sched,
                        "amount": $scope.amount,
                        "currency": $scope.currency,
                        "customer": {
                            "first_name": $scope.first_name,
                            "last_name": $scope.last_name,
                            "email": $scope.email,
                            "payment_source": {
                                "address_line1": $scope.address_line1,//'dfgfdg',
                                "address_line2": $scope.address_line2,//'fghfh',
                                "address_city": $scope.city,//'ghjgdd',
                                "address_state": $scope.state,//'gfhjdghjghj',
                                "address_country": $scope.country,//'gfhfhdg',
                                "address_postcode": $scope.postcode,//'1234',
                                "gateway_id": $scope.gateway_id,//$scope.gateway_id,//"53f79cddcc8d0e6b8a2e8a6c",
                                "type": "bsb",
                                "account_name": $scope.account_name,//"test user",
                                "account_bsb": $scope.account_bsb,//"4111111111111111",brain
                                "account_number": $scope.account_number

                            }
                        }
                    }
                }
            }

            Main.addnewsubscriptions(formData, function (res) {
                if (res.type == false) {
                    alert(res.data);
                    $scope.resolved = true;
                    console.log(res);
                } else {
                    $scope.addFormVisible = false;
                    $scope.class='test_message';
                    $scope.action = 'Action has been created successfully';
                    if ($scope.interval == 'one-off') {
                        window.location.href = "#/payments/charges";
                    } else {
                        window.location.href = "#/payments/subscriptions";
                    }

                }
            }, function (res) {
                $scope.resolved = true;
                //$scope.action = res.error.message + ':' + res.error.details;
                $scope.class='test_message';
                if(res.error)$scope.action = res.error.message;
                if(res._message) $scope.action = res._message + ': ' + res._errors;
                console.log(res);
                $rootScope.error = 'Failed to signup';
            })
        };

        function selectedGatewayTypeEquivalent(type) {
            var selectedGateway = '';
            angular.forEach($scope.myTails, function(gateway) {
                if (gateway._id == $scope.gateway_id) {
                    selectedGateway = gateway;
                    return;
                }
            });

            if (!selectedGateway) {
                return false;
            }

            return (selectedGateway.type == type);
        }
    }]);