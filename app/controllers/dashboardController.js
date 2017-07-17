app.controller("DashboardController", function($controller, $scope, AlertService, User, OverallStatusPublic, OverallStatusFull, Service, ServiceRepo, NoteRepo) {

    angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

    $scope.overallStatus = $scope.isFullServiceConsumer() ? new OverallStatusFull() : new OverallStatusPublic();

    $scope.services = ServiceRepo.getAll();

    $scope.getNoteById = function(id) {
      return NoteRepo.findById(id);
    };

});