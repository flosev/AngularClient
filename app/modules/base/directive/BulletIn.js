/**
 * Created by fedor on 17.06.2015.
 */
angular.module('base').directive('bulletIn', ['$http','$rootScope', 'APP_PARAMS', function($http,$rootScope, APP_PARAMS) {
        'use strict';

        return {
            //template: 'Name:{{name}}  Address: ',
            template: '<div  ng-repeat="bulletin in myBulletin">' +
            '<p ng-show="bulletin.read==false"  class="bulletin" >{{bulletin.body}}<a class="bulletin_close" ng-if="bulletin.global==false" ng-click="deleteBulletin(bulletin._id);bulletin.read=true"></a></p>' +
            '<div>',
            restrict: 'A',
            //require : 'ngModel',
            // responsible for registering DOM listeners as well as updating the DOM

            link: function ($scope, $rootScope, element) {

                 $http.get(APP_PARAMS.urlApi  + '/companies/bulletins').success(function (res) {

                    if (res.type == false) {
                        alert(res.data)
                    } else {
                        $scope.myBulletin= res.bulletins;
                        console.log($scope.myBulletin);
                        $scope.name = 'Jeff';
                        //return res;
                    }
                }).error(function () {
                    $rootScope.error = 'Failed to signup';
                });
            }
        };
    }]);


