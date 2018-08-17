app.controller('ServiceDetailController', function ($controller, $routeParams, $scope, ServiceRepo) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    $scope.activeTab = 'ideas';

    $scope.serviceDisabled = true;

    ServiceRepo.ready().then(function () {
        $scope.service = ServiceRepo.findById($routeParams.serviceId);

        $scope.notesTableParams = $scope.service.getNotesTableParams();

        $scope.hasNotes = function () {
            return $scope.notesTableParams.data.length > 0;
        };
    });

    $scope.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.getServiceWebsite = function (service) {
        var link = service.website;
        if (link && link.indexOf('//') === -1) {
            link = '//' + link;
        }
        return link;
    };

});
