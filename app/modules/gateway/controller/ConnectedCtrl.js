

/**
 * ConnectedCtrl controller
 *
 * @constructor
 */
angular.module('gateway').controller('gateway.ConnectedCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main', 'connectedgateways', 'Upload',
    function ($rootScope, $scope, $location, $localStorage, Main, connectedgateways, Upload) {
        'use strict';

        $scope.myTails = connectedgateways.data.resource.data;
        $scope.action='';
        $scope.class='';

        if(connectedgateways.data.resource.data.length==0)$scope.emptyMessage = true;
        var lengthArr= connectedgateways.data.resource.data.length;
        $scope.deletegateways = function (delgatewayid) {
            var urldet = $rootScope.baseUrl + "/gateways/" + delgatewayid;
            $scope.action = '';
            $scope.class='';

            var formData = {
                method: 'DELETE',
                url: urldet,
                headers: {}
            }
            console.log(formData);
            Main.addnewgateways(formData, function (res) {
                if (res.type == false) {
                    $scope.class='test_message';
                    $scope.action = res.error;
                    //alert(res.data)
                } else {
                    $scope.detailsFormVisible = false;
                    $scope.action = 'Gateway has been deleted successfully';
                    $scope.class='test_message';
                    window.location.reload();
                    console.log(res);

                }
            }, function (res) {
                $rootScope.error = 'Failed to signup';
                $scope.class='test_message';
                $scope.action = res.error.message + ':' + res.error.details;
                console.log(res);
            })
        };
        $scope.editgateways = function (editgatewayid, type) {
            //console.log($scope.edgetname);
            //debugger;
            switch (type) {
                case 'Brain':
                    var data = {
                        "name": this.edgatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": this.password,//"Hello1234",
                        "merchant": this.merchant,
                        "type": "Brain",
                        "mode": this.mode
                    }
                    break;
                case 'Eway':
                    var data = {
                        "name": this.gatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": this.password,//"Hello1234",
                        "type": "Eway",
                        "mode": this.mode
                    }
                    break;
                case 'Ezidebit':
                    var data = {
                        "name": this.gatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": this.password,//"Hello1234",
                        "type": "Ezidebit",
                        "mode": this.mode
                    }
                    break;
                case 'Paypal':
                    var data = {
                        "name": this.gatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": $this.password,//"Hello1234",
                        "type": "Paypal",
                        "mode": this.mode
                    }
                    break;
                case 'Pin':
                    var data = {
                        "name": this.gatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "type": "Pin",
                        "mode": this.mode
                    }
                    break;
                case 'Stripe':
                    var data = {
                        "name": this.gatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "type": "Stripe",
                        "mode": this.mode
                    }
                    break;
                case 'Payway':
                    var data = {
                        "name": this.gatename,//"First Client Updated Twice eWay",
                        "username": this.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": this.password,//"Hello1234",
                        "merchant": this.merchant,//"r7pcwvkbkgjfzk99",
                        "certificate_passphrase": this.certpass, //"C45wm74he",
                        "certificate_id": this.certid,//"551cf08243daf16f355ab3a7",
                        "type": "Payway",
                        "mode": this.mode
                    }
                    break;
            }

            var urldet = $rootScope.baseUrl + "/gateways/" + editgatewayid;
            $scope.action = '';
            var formData = {
                method: 'PUT',
                url: urldet,
                headers: {},
                data: data

            }
            console.log(formData);
            Main.editgateways(formData, function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {

                    //console.log(res);
                    $scope.action = 'Gateway was updated successfully';
                    window.location.reload();
                    //window.location.href = "#/customers/addnew";
                }
            }, function (res) {
                $rootScope.error = 'Failed to signup';
                $scope.action = res.error;
            })
        };
        $scope.choosegate = function (gatetype) {
            $scope.class='';
            $scope.action='';
            $scope.detailsFormVisible = [];
            for(var i = 0; i < lengthArr; i++) $scope.detailsFormVisible[i]=false;
            //$scope.detailsFormVisible[index]=true;
            switch (gatetype) {

                case 'Payway':
                    $scope.paywayupdateFormVisible = true;
                    $scope.braintreeupdateFormVisible = false;
                    $scope.ewayupdateFormVisible = false;
                    $scope.ezidebitupdateFormVisible = false;
                    $scope.paypalupdateFormVisible = false;
                    $scope.pinupdateFormVisible = false;
                    $scope.stripeupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
                case 'Brain':
                    $scope.braintreeupdateFormVisible = true;
                    $scope.paywayupdateFormVisible = false;
                    $scope.ewayupdateFormVisible = false;
                    $scope.ezidebitupdateFormVisible = false;
                    $scope.paypalupdateFormVisible = false;
                    $scope.pinupdateFormVisible = false;
                    $scope.stripeupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
                case 'Eway':
                    $scope.ewayupdateFormVisible = true;
                    $scope.braintreeupdateFormVisible = false;
                    $scope.paywayupdateFormVisible = false;
                    $scope.ezidebitupdateFormVisible = false;
                    $scope.paypalupdateFormVisible = false;
                    $scope.pinupdateFormVisible = false;
                    $scope.stripeupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
                case 'Ezidebit':
                    $scope.ezidebitupdateFormVisible = true;
                    $scope.paywayupdateFormVisible = false;
                    $scope.braintreeupdateFormVisible = false;
                    $scope.ewayupdateFormVisible = false;
                    $scope.paypalupdateFormVisible = false;
                    $scope.pinupdateFormVisible = false;
                    $scope.stripeupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
                case 'Paypal':
                    $scope.paypalupdateFormVisible = true;
                    $scope.paywayupdateFormVisible = false;
                    $scope.braintreeupdateFormVisible = false;
                    $scope.ewayupdateFormVisible = false;
                    $scope.ezidebitupdateFormVisible = false;
                    $scope.pinupdateFormVisible = false;
                    $scope.stripeupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
                case 'Pin':
                    $scope.pinupdateFormVisible = true;
                    $scope.paywayupdateFormVisible = false;
                    $scope.braintreeupdateFormVisible = false;
                    $scope.ewayupdateFormVisible = false;
                    $scope.ezidebitupdateFormVisible = false;
                    $scope.paypalupdateFormVisible = false;
                    $scope.stripeupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
                case 'Stripe':
                    $scope.stripeupdateFormVisible = true;
                    $scope.paywayupdateFormVisible = false;
                    $scope.braintreeupdateFormVisible = false;
                    $scope.ewayupdateFormVisible = false;
                    $scope.ezidebitupdateFormVisible = false;
                    $scope.paypalupdateFormVisible = false;
                    $scope.pinupdateFormVisible = false;
                    //$scope.mainFormVisible = true;
                    break;
            }
        };
        $scope.testgateways = function (gatewayid) {
            var urldet = $rootScope.baseUrl + "/gateways/" + gatewayid + '?actions=check';
            $scope.action = '';
            $scope.class='';
            var formData = {
                method: 'PUT',
                url: urldet,
                headers: {}
            }
            Main.testgateways(formData, function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $scope.action = 'Gateway was tested successfully';
                    $scope.class='test_message';
                }
            }, function (res) {
                $rootScope.error = 'Failed to signup';
                $scope.action = res.error.message + ':' + res.error.details;
                $scope.class='test_message';

            })
        };

        //$scope.myTails=res.gateways;
        //$scope.token = $localStorage.token;
    }]);