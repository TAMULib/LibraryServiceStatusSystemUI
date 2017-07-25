app.controller("DashboardController", function($controller, $scope, AlertService, User, OverallStatusPublic, OverallStatusFull, Service, ServiceRepo, NoteRepo, UserService) {

    angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

    $scope.overallStatus = $scope.isFullServiceConsumer() ? new OverallStatusFull() : new OverallStatusPublic();

    $scope.services = ServiceRepo.getAll();

    $scope.showShortList = true;

    $scope.pageSettings = {
      pageNumber: 0,
      pageSize: 10,
      direction: 'DESC',
      properties: 'title',
      filters: {title: []}
    };
    console.log($scope);

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

    NoteRepo.ready().then(function() {
      console.log($scope.pageSettings);
      loadPage(0, $scope.pageSettings.pageSize, 'DESC', 'title', {title: []});
    });

    var loadPage = function() {
      NoteRepo.page(
        $scope.pageSettings.pageNumber,
        $scope.pageSettings.pageSize,
        $scope.pageSettings.direction,
        $scope.pageSettings.properties,
        $scope.pageSettings.filters
      ).then(function(value) {
        $scope.notes = value.content;
      });
    }

    $scope.$watchCollection('pageSettings', function(newValue) {
      loadPage();
    });
});