/**
 * route
 */
angular.module('auth').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/sign-in', {
            templateUrl: 'views/login/signInForm.html',
            controller: 'auth.SignInCtrl'
        }).
        when('/trouble', {
            templateUrl: 'views/login/troubleForm.html',
            controller: 'auth.RecoveryCtrl'
        }).
        when('/sign-up', {
            templateUrl: 'views/login/signUpForm.html',
            controller: 'auth.SignUpCtrl'
        });
}]);