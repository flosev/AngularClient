

/**
 * SubscriptionCtrl controller
 *
 * @constructor
 */
angular.module('payment').controller('payment.SubscriptionCtrl', [
    '$rootScope', '$scope', '$location', '$routeParams','$localStorage', '$filter', 'Main', 'paymentsSubscriptions', 'customers', 'csvGenerator',
    function ($rootScope, $scope, $location, $routeParams, $localStorage, $filter, Main, paymentsSubscriptions, customers, csvGenerator) {
        'use strict';
        $scope.action =  '';
        $scope.class='';
        $scope.TABLE_TYPE = {
            DETAIL: 'detail',
            EDIT: 'edit',
        };

        $scope.myCustom = customers.data.resource.data;
        $scope.mySubscr = paymentsSubscriptions.data.resource.data;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.extendedSubscription = '';
        $scope.showedTable = $scope.TABLE_TYPE.DETAIL;
        $scope.showedLink = '';

        $scope.subs = [];

        $scope.pagination = {
            current: 1
        };

        $scope.expandSubscription = expandSubscription;
        $scope.isExtendedSubscription = isExtendedSubscription;
        $scope.collapseSubscriptions = collapseSubscriptions;
        $scope.showTable = showTable;
        $scope.isShowedTable = isShowedTable;
        $scope.getLink = getLink;
        $scope.showLink = showLink;
        $scope.isShowedLink = isShowedLink;
        $scope.hideLinks = hideLinks;
        $scope.saveToCsv = saveToCsv;
        $scope.isSelectedById = isSelectedById;


        function isSelectedById() {
            return !(angular.isUndefined($routeParams.id));
        }

        function expandSubscription(index) {
            if (!angular.isUndefined($scope.subs[index])) {
                $scope.extendedSubscription = index;
                hideLinks();
            }
        }

        function isExtendedSubscription(index) {
            return (!angular.isUndefined($scope.subs[index]) && $scope.extendedSubscription === index);
        }

        function collapseSubscriptions() {
            $scope.extendedSubscription = '';
        }

        function showTable(type) {
            $scope.showedTable = type;
        }

        function isShowedTable(type) {
            return ($scope.showedTable === type);
        }

        function showLink(index) {
            if (!angular.isUndefined($scope.subs[index])) {
                $scope.showedLink = index;
            }
        }

        function isShowedLink(index) {
            return ($scope.showedLink === index);
        }

        function hideLinks() {
            $scope.showedLink = '';
        }

        function getList() {
            if (isSelectedById()) {
                getById($routeParams.id);
            }
            else {
                getAll();
            }
        }

        function getLink(index) {
            if (!angular.isUndefined($scope.subs[index])) {
                var url = $location.absUrl();
                if (url.indexOf('?') !== -1) {
                    url = url.substr(0, url.indexOf('?'));
                }
                url = url+'?id='+ $scope.subs[index]._id;
                return url;
            }
        }

        function saveToCsv() {
            var file = csvGenerator.compileCollection($scope.subs, function(object) {
                return csvGenerator.compileObject(object, [
                    'customer.first_name',
                    'customer.last_name',
                    'customer.email',
                    'amount',
                    'currency',
                    'created_at',
                    'schedule.next_assessment',
                    'status'
                ]);
            });
            csvGenerator.saveFile('subscription-'+ $filter('date')(new Date(), 'yyyy_MM_dd_HH_mm') +'.csv', file);
        }

        $scope.pageChanged = function (newPage) {
            getList();
        };
        $scope.$watch("searchword", function (newValue, oldValue) {
            getList();
        });
        $scope.$watch("orderProp", function (newValue, oldValue) {
            getList();
        });


        function getById(id) {
            var urldet = $rootScope.baseUrl + '/subscriptions/' + id;

            var formData = {
                method: 'GET',
                url: urldet,
                headers: {}
            }

            Main.sendrequest(formData, function (res) {
                $scope.subs = [res.resource.data];
                $scope.totalSubs = res.resource.count
                $scope.emptyMessage = (res.resource.data.length==0)? true :false;
                expandSubscription(0);
            }, function(){});

        }


        function getAll(pageNumber) {
            //if ($scope.pageSize > 99)$scope.pageSize=99;
            var skip = ($scope.currentPage - 1) * ($scope.pageSize);
            var limit = $scope.pageSize;
            var urldet = $rootScope.baseUrl + '/subscriptions/?skip=' + skip + '&limit=' + limit;
            collapseSubscriptions();
            $scope.action = '';
            if ($scope.searchword)urldet += '&search=' + $scope.searchword;
            if($scope.orderProp) {
                if ($scope.orderProp == 'created_at'||'schedule.next_assessment') {
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
                    console.log(res);
                    $scope.subs = res.resource.data;
                    $scope.totalSubs = res.resource.count
                    if(res.resource.data.length==0)$scope.emptyMessage = true;
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

        //Forward from charges
        //$scope.searchword= $location.href.split('=')[1];
        console.log(window.location.href.split('=')[1]);
        if(window.location.href.split('=')[1]) {
            $scope.forwardFormVisible = true;
            $scope.detailsforwardFormVisible=true;
            var urldet = $rootScope.baseUrl+"/subscriptions/"+ window.location.href.split('=')[1];
            var formData = { method: 'GET',
                url:  urldet,
                headers: {}
            }
            Main.sendrequest(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $scope.detailSubscr=res.resource.data;
                    console.log(res);
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
                //console.log(res);
                window.alert ('Input correct data');
            })
        }else{$scope.forwardFormVisible = false;}
        console.log($scope.forwardFormVisible);

        //end forward from charges



        $scope.deletesubscr = function (delsubid) {

            var urldet = $rootScope.baseUrl + "/subscriptions/" + delsubid;
            $scope.action = '';
            var formData = {
                method: 'DELETE',
                url: urldet,
                headers: {}
            }
            Main.sendrequest(formData, function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $scope.detailsFormVisible = false;
                    $scope.action = 'Subscription has been deleted successfully';
                    getList();
                    //$scope.myCustom=res.resource.data;
                }
            }, function () {
                $rootScope.error = 'Failed to signup';
                $scope.action = res.error.message + ": " + res.error.details;
                $scope.class = "test_message";

            })
        };

        $scope.editSubscription = function (id) {
            $scope.action = '';
            $scope.class='';
            var data = {
                "schedule": {
                    "frequency": this.frequency,
                    "interval": this.interval,
                    "start_date": this.start_date,
                    "end_date": this.end_date
                },
                "amount": this.amount,
                "currency": this.currency,
                "description": this.description,
                "reference": this.reference
            }

            var urldet = $rootScope.baseUrl + "/subscriptions/" + id;

            var formData = {
                method: 'POST',
                url: urldet,
                headers: {},
                data: data
            }
            //debugger;
            Main.sendrequest(formData, function (res) {
                if (res.type == false) {

                    alert(res.data)
                } else {
                    $scope.detailsFormVisible = false;
                    $scope.action = 'Subscription was updated successfully';
                    $scope.class = "test_message";
                    getList();
                }
            }, function (res) {
                $rootScope.error = 'Failed to signup';
                $scope.class = "test_message";
                $scope.action = res.error.message + ": " + res.error.details;

            })
        };


        $scope.viewtrans = function (currTrans) {
            var urldet = $rootScope.baseUrl + "/charges?subscription_id=" + currTrans;
            $scope.action = '';
            var formData = {
                method: 'GET',
                url: urldet,
                headers: {}
            }
            Main.sendrequest(formData, function (res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    console.log(res);
                    //$scope.detailsFormVisible =false;
                    //$scope.myCustom=res.resource.data;
                }
            }, function () {
                $rootScope.error = 'Failed to signup';
                //console.log(res);
                window.alert('Input correct data');
            })
        };


    }]);