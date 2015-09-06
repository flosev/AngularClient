
/**
 * route
 */
angular.module('payment').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/payments/charges', {
            templateUrl: 'views/payments/charges.html',
            controller: 'payment.ChargesCtrl',
            resolve: {
                paymentsCharges: function (Main) {
                    return Main.paymentsCharges();
                }
            }
        }).
        when('/payments/subscriptions', {
            templateUrl: 'views/payments/subscriptions.html',
            controller: 'payment.SubscriptionCtrl',
            resolve: {
                paymentsSubscriptions: function (Main) {
                    return Main.paymentsSubscriptions()
                },
                customers: function (Main) {
                    return Main.customers()
                }
            }
        }).
        when('/payments/addnew', {
            templateUrl: 'views/payments/addnew.html',
            controller: 'payment.AddCtrl',
            resolve: {
                paymentsSubscriptions: function (Main) {
                    return Main.paymentsSubscriptions()
                },
                connectedgateways: function (Main) {
                    return Main.connectedgateways();
                }
            }
        });
}]);