app.controller("DashboardController", function($controller, $scope, AlertService, User, OverallStatusPublic, OverallStatusFull, Service, ServiceRepo) {

    angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

    $scope.overallStatus = $scope.isFullServiceConsumer() ? new OverallStatusFull() : new OverallStatusPublic();

    $scope.services = ServiceRepo.getAll();



});