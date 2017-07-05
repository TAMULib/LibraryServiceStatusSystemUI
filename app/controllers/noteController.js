app.controller('NoteController', function($controller, $scope, NoteRepo, NgTableParams) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.notes = NoteRepo.getAll();

  $scope.forms = {};

  var buildTable = function() {
    $scope.tableParams = new NgTableParams({}, {
      counts: [],
      filterDelay: 0,
      dataset: NoteRepo.getAll()
    });
  };

  NoteRepo.ready().then(function() {
    buildTable();
    $scope.tableParams.reload();
  });
});