app.controller('ServiceDetailFeatureProposalManagementController', function ($controller, $scope) {

    angular.extend(
        this,
        $controller(
            'ServiceDetailController',
            { $scope: $scope }
        ),
        $controller(
            'FeatureProposalController',
            { $scope: $scope }
        )
    );
});