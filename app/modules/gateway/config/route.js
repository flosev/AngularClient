

/**
 * route
 */
angular.module('gateway').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/gateways/connected', {
            templateUrl: 'views/gateways/connected.html',
            controller: 'gateway.ConnectedCtrl',
            resolve: {
                connectedgateways: function (Main) {
                    return Main.connectedgateways();
                }
            }
        }).
        when('/gateways/addnew', {
            templateUrl: 'views/gateways/addnew.html',
            controller: 'gateway.AddCtrl'
        });
}]);