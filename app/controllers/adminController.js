app.controller('AdminController', function ($controller, $injector, $route, $scope, AssumedControl, AuthServiceApi, StorageService, UserService, WsApi) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

});
