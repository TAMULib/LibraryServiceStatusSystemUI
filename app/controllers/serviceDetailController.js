app.controller('ServiceDetailController', function ($controller, $routeParams, $scope, ServiceRepo) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    ServiceRepo.ready().then(function () {
        $scope.service = ServiceRepo.findById($routeParams.serviceId);
        $scope.notesTableParams = $scope.service.getNotesTableParams();
        $scope.ideasTableParams = $scope.service.getIdeasTableParams();
        $scope.featureProposalsTableParams = $scope.service.getFeatureProposalsTableParams();
    });

});