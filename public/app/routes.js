var app =  angular.module('main-App',['ngRoute','angularUtils.directives.dirPagination']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'AdminController'
            }).
            when('/products', {
                templateUrl: 'templates/products.html',
                controller: 'ProductController'
            });
}]);

app.value('apiUrl', 'http://localhost/laravelangular/public');
