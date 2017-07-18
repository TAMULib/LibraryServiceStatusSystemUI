app.controller("DashboardController", function($controller, $scope, AlertService, User, OverallStatusPublic, OverallStatusFull, Service, ServiceRepo, NoteRepo, UserService) {

    angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

    $scope.overallStatus = $scope.isFullServiceConsumer() ? new OverallStatusFull() : new OverallStatusPublic();

    $scope.services = ServiceRepo.getAll();

    $scope.showShortList = true;

    $scope.getNoteById = function(id) {
      return NoteRepo.findById(id);
    };

    $scope.showPublic = function() {
      var user = UserService.getCurrentUser();
      var publicView = false;
      if (user.role === 'ROLE_ANONYMOUS' || user.role === 'ROLE_USER') {
        publicView = true;
      } 
      return publicView;
    };

    $scope.showHideShortList = function() {
      $scope.showShortList = !$scope.showShortList;
    }

});