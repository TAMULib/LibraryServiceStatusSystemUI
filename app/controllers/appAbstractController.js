app.controller("AppAbstractController", function ($controller, $scope) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.hasAdminAccess = function () {
        return ($scope.isAdmin() || $scope.isServiceAdmin());
    };

    // Admins have management access
    $scope.hasManagementAccess = function () {
        return ($scope.hasAdminAccess() || $scope.isWebManager() || $scope.isServiceManager() || $scope.isNoticeManager());
    };

    $scope.isServiceAdmin = function () {
        return (sessionStorage.role === "ROLE_SERVICE_ADMIN");
    };

    $scope.isWebManager = function () {
        return (sessionStorage.role === "ROLE_WEB_MANAGER");
    };

    $scope.isServiceManager = function () {
        return (sessionStorage.role === "ROLE_SERVICE_MANAGER");
    };

    $scope.isNoticeManager = function () {
        return (sessionStorage.role === "ROLE_NOTICE_MANAGER");
    };

    $scope.isStaff = function () {
        return (sessionStorage.role === "ROLE_STAFF");
    };

    $scope.isFullServiceConsumer = function () {
        return $scope.isStaff() || $scope.hasManagementAccess();
    };

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