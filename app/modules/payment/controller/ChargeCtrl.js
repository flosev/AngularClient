

/**
 * ChargesCtrl controller
 *
 * @constructor
 */
angular.module('payment').controller('payment.ChargesCtrl', [
    '$rootScope', '$scope', '$location', '$filter', '$localStorage', 'Main', 'paymentsCharges', 'APP_PARAMS', 'csvGenerator',
    function ($rootScope, $scope, $location, $filter, $localStorage, Main, paymentsCharges, APP_PARAMS, csvGenerator) {
        'use strict';

        $scope.myCharges = paymentsCharges.data.resource.data;
        if(paymentsCharges.data.resource.data.length==0)$scope.emptyMessage = true;

        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.chars = [];

        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.saveToCsv = saveToCsv;

        $scope.pageChanged = function (newPage) {
            getResultsPage(newPage);
        };
        $scope.$watch("searchword", function (newValue, oldValue) {
            getResultsPage($scope.currentPage);
        });
        $scope.$watch("orderProp", function (newValue, oldValue) {
            getResultsPage($scope.currentPage);
        });

        function getResultsPage(pageNumber) {
            var skip = ($scope.currentPage - 1) * ($scope.pageSize);
            var limit = $scope.pageSize;
            //var urldet = APP_PARAMS.urlApi+'/charges/?skip='+skip+'&limit='+limit;
            var urldet = APP_PARAMS.urlApi + '/charges/?skip=' + skip + '&limit=' + limit;

            $scope.action = '';
            if ($scope.searchword)urldet += '&search=' + $scope.searchword;
            if($scope.orderProp) {
                if ($scope.orderProp == 'created_at') {
                    urldet += '&sortkey=' + $scope.orderProp + '&sortdirection=DESC';
                }
                else {
                    urldet += '&sortkey=' + $scope.orderProp;
                }
            }
            //console.log(urldet);
            var formData = {
                method: 'GET',
                url: urldet,
                headers: {}
            }

            Main.sendrequest(formData, function (res) {
                if (res.type == false) {
                    //alert(res.data)
                } else {
                    //console.log(res);
                    $scope.chars = res.resource.data;
                    $scope.totalChars = res.resource.count
                    //$scope.detailsFormVisible =false;
                    //$scope.action = 'Subscription has been deleted successfully';
                    //window.location.reload();
                    //$scope.myCustom=res.resource.data;
                }
            }, function () {
                //$rootScope.error = 'Failed to signup';
                //console.log(res);
            })

        }


        $scope.chargedetails = function (chargeidpath) {
            $scope.detailsFormVisible = [];
            for(var i = 0; i < $scope.pageSize; i++) $scope.detailsFormVisible[i]=false;
            var urldet = $rootScope.baseUrl + "/charges/" + chargeidpath;
            //console.log(chargeid);
            var formData = {
                method: 'GET',
                url: urldet
            }

            Main.sendrequest(formData, function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    //$scope.detailsFormVisible = true;
                    console.log(res);
                    $scope.myChargedet = res.resource.data;
                    $scope.prettyCharge= JSON.stringify($scope.myChargedet, undefined, 4);
                    var withoutTrans = $scope.myChargedet;
                    delete withoutTrans.transactions;
                    $scope.onlyCharge= JSON.stringify(withoutTrans, undefined, 4);


                }
            }, function () {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.gotosubscription = function (subscriptionId){
            $location.path('/payments/subscriptions').search({search: subscriptionId});
        }

        function saveToCsv() {
            var file = csvGenerator.compileCollection($scope.chars, function(object) {
                return csvGenerator.compileObject(object, [
                    'customer.first_name',
                    'customer.last_name',
                    'customer.email',
                    'amount',
                    'currency',
                    'created_at',
                    'status'
                ]);
            });
            csvGenerator.saveFile('charges-'+ $filter('date')(new Date(), 'yyyy_MM_dd_HH_mm') +'.csv', file);
        }
    }]);