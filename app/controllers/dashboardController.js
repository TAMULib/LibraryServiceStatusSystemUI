app.controller("DashboardController", function($controller, $scope, AlertService, OverallStatus) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    $scope.overallStatus = new OverallStatus();

    $scope.overallStatus.ready().then(function() {
        AlertService.add({type: $scope.overallStatus.type, message: $scope.overallStatus.message}, "status/general");
    });

});