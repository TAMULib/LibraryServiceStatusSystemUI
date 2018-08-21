app.controller("DashboardController", function ($controller, $scope, UserService, NoteRepo, OverallStatusFull, OverallStatusPublic, ServiceRepo) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    // Clear out any cached pages and get full list of services.
    ServiceRepo.reset();

    $scope.overallStatus = $scope.isFullServiceConsumer() ? new OverallStatusFull() : new OverallStatusPublic();

    $scope.services = ServiceRepo.getAll();

    $scope.showShortList = true;

    $scope.showPublic = function () {
        var user = UserService.getCurrentUser();
        var publicView = false;
        if (user.role === undefined || user.role === null) {
            publicView = true;
        } else if (user.role === 'ROLE_ANONYMOUS' || user.role === 'ROLE_USER') {
            publicView = true;
        }
        return publicView;
    };

    $scope.showHideShortList = function () {
        $scope.showShortList = !$scope.showShortList;
    };

    $scope.tableParams = NoteRepo.getTableParams();

    NoteRepo.getPageSettings().filters = {
        active: [true]
    };

    NoteRepo.getPageSettings().sort = [{
        property: 'service.name',
        direction: 'ASC'
    }, {
        property: 'lastModified',
        direction: 'DESC'
    }];

});