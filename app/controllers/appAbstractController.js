app.controller("AppAbstractController", function($controller, $scope) {
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.isWebManager = function () {
        return (sessionStorage.role === "ROLE_STAFF");
    };

    $scope.isServiceManager = function () {
        return (sessionStorage.role === "ROLE_STAFF");
    };

    $scope.isStaff = function () {
        return (sessionStorage.role === "ROLE_STAFF");
    };

    $scope.isFullServiceConsumer = function() {
        return  $scope.isStaff() || 
                $scope.isServiceManager() ||
                $scope.isWebManager() ||
                $scope.isAdmin()
    };

});