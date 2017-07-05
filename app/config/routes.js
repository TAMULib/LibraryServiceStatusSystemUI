
app.config(function($routeProvider) {	
	$routeProvider.
		when('/management', {
			redirectTo: '/management/services'
		}).
		when('/management/:tab', {
			templateUrl: 'views/management.html',
			access: ["ROLE_ADMIN", "ROLE_MANGER"]
		}).
		when('/users', {
			templateUrl: 'views/users.html',
			access: ["ROLE_ADMIN", "ROLE_MANGER"]
		}).
		when('/services', {
			templateUrl: 'views/management/services.html',
			controller: 'ServiceController',
			access: ["ROLE_ADMIN", "ROLE_MANGER"]
		}).
		when('/notes', {
			templateUrl: 'views/management/notes.html',
			controller: 'NoteController',
			access: ["ROLE_ADMIN", "ROLE_MANGER"]
		}).
		when('/home', {
			redirectTo: '/'
		}).
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
