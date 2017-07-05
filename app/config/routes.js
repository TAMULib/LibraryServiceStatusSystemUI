
app.config(function($routeProvider) {	
	$routeProvider.
		when('/', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardController'
		}).
		when('/users', {
			templateUrl: 'views/users.html',
			controller: 'UserRepoController'
		}).
		// Error Routes
		when('/error/403', {
			templateUrl: 'views/errors/403.html',
			controller: 'ErrorPageController'
		}).
		when('/error/404', {
			templateUrl: 'views/errors/404.html',
			controller: 'ErrorPageController'

		}).
		when('/error/500', {
			templateUrl: 'views/errors/500.html',
			controller: 'ErrorPageController'
		}).
		otherwise({
			redirectTo: '/error/404'
		});
});
