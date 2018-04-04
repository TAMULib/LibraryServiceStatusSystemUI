app.controller('AdminController', function ($controller, $injector, $route, $scope, AssumedControl, AuthService, StorageService, UserService, WsApi) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

});