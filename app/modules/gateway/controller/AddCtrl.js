

/**
 * ConnectedCtrl controller
 *
 * @constructor
 */
angular.module('gateway').controller('gateway.AddCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main', 'Upload',
    function ($rootScope, $scope, $location, $localStorage, Main, Upload, addnewgateways) {
        'use strict';

        $scope.cleanform = function () {
            $scope.gatename = '';
            $scope.username = '';
            $scope.password = '';
            $scope.merchant = '';
            $scope.action='';
            $scope.class='';
        }
        $scope.addnewgateways = function (type) {
            switch (type) {
                case 'Brain':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": $scope.password,//"Hello1234",
                        "merchant": $scope.merchant,
                        "type": "Brain",
                        "mode": $scope.mode
                    }
                    break;
                case 'Eway':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": $scope.password,//"Hello1234",
                        "type": "Eway",
                        "mode": $scope.mode
                    }
                    break;
                case 'Ezidebit':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": $scope.password,//"Hello1234",
                        "type": "Ezidebit",
                        "mode": $scope.mode
                    }
                    break;
                case 'Paypal':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": $scope.password,//"Hello1234",
                        "type": "Paypal",
                        "mode": $scope.mode
                    }
                    break;
                case 'Pin':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "type": "Pin",
                        "mode": $scope.mode
                    }
                    break;
                case 'Stripe':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "type": "Stripe",
                        "mode": $scope.mode
                    }
                    break;
                case 'Payway':
                    var data = {
                        "name": $scope.gatename,//"First Client Updated Twice eWay",
                        "username": $scope.username,//"60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
                        "password": $scope.password,//"Hello1234",
                        "merchant": $scope.merchant,//"r7pcwvkbkgjfzk99",
                        "certificate_passphrase": $scope.certpass, //"C45wm74he",
                        "certificate_id": $scope.certid,//"551cf08243daf16f355ab3a7",
                        "type": "Payway",
                        "mode": $scope.mode
                    }
                    break;
            }
            var formData = {
                method: 'POST',
                url: $rootScope.baseUrl + "/gateways",
                headers: {},
                data: data
            }


            Main.addnewgateways(formData, function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $scope.braintreeFormVisible = false;
                    $scope.ewayFormVisible = false;
                    $scope.ewayFormVisible = false;
                    $scope.paypalFormVisible = false;
                    $scope.pinFormVisible = false;
                    $scope.stripeFormVisible = false;
                    $scope.westpacFormVisible = false;
                    window.location.href = "#/gateways/connected";
                    $scope.action = 'Gateway has been created successfully';
                    //$scope.myCustom=res.resource.data;
                }
            }, function (res) {
                $rootScope.error = 'Failed to signup';
                console.log(res);
                $scope.class='test_message';
                $scope.action = 'Could not connect this gateway';
            })
        };
        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: $rootScope.baseUrl + '/files',
                        //headers : {
                        //    'Content-Type': "binary/octet-stream"
                        //},
                        fields: {'username': $scope.username},
                        file: file,
                        fileFormDataName: 'cert'
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        if (status < 300 && data.file && data.file._id) {
                            $scope.certid = data.file._id;
                        }
                        console.log(data, status);
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);

                    });
                }
            }
        };


    }]);