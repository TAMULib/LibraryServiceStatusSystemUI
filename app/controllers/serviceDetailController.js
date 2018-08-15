app.controller('ServiceDetailController', function ($controller, $anchorScroll, $routeParams, $scope, $timeout, ServiceRepo) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    $scope.activeTab = 'ideas';

    $scope.serviceDisabled = true;

    ServiceRepo.ready().then(function () {
        $scope.service = ServiceRepo.findById($routeParams.serviceId);

        $scope.notesTableParams = $scope.service.getNotesTableParams();
        $scope.featureProposalsTableParams = $scope.service.getFeatureProposalsTableParams();

        $timeout(function () {
            $anchorScroll();
        }, 500);

        $scope.hasFeatureProposals = function () {
            return $scope.featureProposalsTableParams.data.length > 0;
        };

    });

    $scope.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.getServiceWebsite = function (service) {
        var link = service.website;
        if (link.indexOf('//') === -1) {
            link = '//' + link;
        }
        return link;
    };

});