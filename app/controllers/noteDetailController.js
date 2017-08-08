app.controller('NoteDetailController', function ($controller, $routeParams, $scope, NoteRepo) {

  angular.extend(this, $controller('AppAbstractController', {
    $scope: $scope
  }));

  $scope.note = NoteRepo.fetchById($routeParams.noteId);
});