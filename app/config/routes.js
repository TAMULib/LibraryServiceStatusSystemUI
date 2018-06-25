app.config(function ($routeProvider) {
    $routeProvider.
    when('/management', {
        redirectTo: '/management/services',
        access: ["ROLE_ADMIN", "ROLE_SERVICE_ADMIN", "ROLE_SERVICE_MANAGER", "ROLE_WEB_MANAGER", "ROLE_NOTICE_MANAGER"]
    }).
    when('/management/:tab', {
        templateUrl: 'views/management.html',
        access: ["ROLE_ADMIN", "ROLE_SERVICE_ADMIN", "ROLE_SERVICE_MANAGER", "ROLE_WEB_MANAGER", "ROLE_NOTICE_MANAGER"]
    }).
    when('/service/:serviceId/detail', {
        templateUrl: 'views/detail/service.html',
        controller: 'ServiceDetailController'
    }).
    when('/note/:noteId/detail', {
        templateUrl: 'views/detail/note.html',
        controller: 'NoteDetailController'
    }).
    when('/request', {
        templateUrl: 'views/request/request.html',
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