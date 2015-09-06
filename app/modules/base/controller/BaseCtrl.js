/**
 * BaseCtrl controller
 *
 * @constructor
 */
angular.module('base').controller('base.BaseCtrl', [
    '$scope', '$location',
    function ($scope, $location) {
        'use strict';

        $scope.routeIsEquivalent = routeIsEquivalent;

        function routeIsEquivalent(link) {
            return $location.path() == link;
        }
    }]);