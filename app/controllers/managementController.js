app.controller('ManagementController', function ($controller, $scope) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.canManageServices = function () {
        return ($scope.hasAdminAccess() || $scope.isServiceManager());
    };

    $scope.canManageNotes = function () {
        return ($scope.hasManagementAccess() && !$scope.isNoticeManager());
    };

    $scope.canManageIdeas = function () {
        return ($scope.hasAdminAccess() || $scope.isServiceManager());
    };

    $scope.canManageFeatureProposals = function () {
        return ($scope.hasAdminAccess() || $scope.isServiceManager());
    };

    $scope.canManageNotifications = function () {
        return ($scope.hasAdminAccess() || $scope.isWebManager() || $scope.isNoticeManager());
    };

    $scope.canManageUsers = function () {
        return $scope.isAdmin();
    };
});