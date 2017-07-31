app.controller("DashboardController", function($controller, $scope, WsApi, User, UserService, AlertService, NoteRepo, OverallStatusFull, OverallStatusPublic, Service, ServiceRepo) {

    angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

    $scope.overallStatus = $scope.isFullServiceConsumer() ? new OverallStatusFull() : new OverallStatusPublic();

    $scope.services = ServiceRepo.getAll();

    $scope.showShortList = true;

    $scope.pageSettings = {
      pageNumber: 0,
      pageSize: 5,
      direction: 'DESC',
      properties: 'title',
      filters: {title: []}
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
        $scope.pageSettings.totalPages = value.totalPages;
        $scope.notes = value.content;
      });
    }

    $scope.$watchCollection('pageSettings', function() {
      loadPage();
    });

    WsApi.listen(noteRepo.mapping.createListen).then(null, null, function(data) {
      NoteRepo.add(angular.fromJson(data.body).payload.Note);
      loadPage();
    });
});