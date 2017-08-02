app.directive("note", function() {
  return {
    templateUrl: 'views/directives/note.html',
    restrict: 'E',
    link: function($scope, element, attr) {
      $scope.link = attr.link;
    }
  };
});