/**
 * Created by fedor on 17.06.2015.
 */
angular.module('base').controller('base.BulletinCtrl', [
    '$rootScope', '$scope', '$location', '$localStorage', 'Main','APP_PARAMS',
    function ($rootScope, $scope, $location, $localStorage, Main, APP_PARAMS) {
        'use strict';

        $scope.deleteBulletin = function(bullId){
                var urldet = APP_PARAMS.urlApi  + '/companies/bulletins/'+bullId;
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
                        $scope.action = 'Gateway was tested successfully';
                        $scope.class='test_message';
                        console.log(res);
                        //window.location.href = "#/customers/addnew";
                    }
                }, function (res) {
                    $scope.action = res.error;
                    $scope.class='test_message';
                    console.log(res);

                })

        };

    }]);