app.controller('ServiceDetailFeatureProposalManagementController', function ($controller, $scope, ServiceRepo) {

    angular.extend(this, $controller('ServiceDetailController', {
        $scope: $scope
    }));

    ServiceRepo.ready().then(function () {
        $scope.ideasTableParams = $scope.service.getIdeasTableParams();
    });
});