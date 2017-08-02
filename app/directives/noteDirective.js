app.directive("note", function() {
  return {
    templateUrl: 'views/directives/note.html',
    restrict: 'E',
    link: function($scope, element, attr) {
      console.log(attr);
      $scope.link = attr.link;
    }
  };
});