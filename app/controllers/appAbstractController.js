app.controller("AppAbstractController", function ($controller, $scope) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.isManager = function() {
        return $scope.isServiceManager() || $scope.isWebManager();
    };

    $scope.isWebManager = function () {
        return (sessionStorage.role === "ROLE_WEB_MANAGER");
    };

    $scope.isServiceManager = function () {
        return (sessionStorage.role === "ROLE_SERVICE_MANAGER");
    };

    $scope.isStaff = function () {
        return (sessionStorage.role === "ROLE_STAFF");
    };

    $scope.isFullServiceConsumer = function () {
        return $scope.isStaff() ||
            $scope.isServiceManager() ||
            $scope.isWebManager() ||
            $scope.isAdmin();
    };

});