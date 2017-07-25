app.directive("paginationButtons", function() {
  return {
    templateUrl: 'views/directives/paginationButtons.html',
    restrict: 'E',
    $scope: {
      'pageSettings': '='
    },
    link: function($scope, element, attr) {
      element.on('click', function(elem) {
        console.log($(elem.target).find("input")[0].id);
        $scope.$apply(function() {
          $scope.pageSettings.pageSize = $(elem.target).find("input")[0].id;
        });
        console.log($scope.pageSettings.pageSize);
      });

      $scope.$watch('pageSettings', function(newVal) {
        if (!$scope.pageSettings || $scope.pageSettings.pageSize) {
          $scope.pageSettings.pageSize = 10;
        }
        element.removeClass('active');
        if (!$scope.pageSettings && newVal === $scope.pageSettings.pageSize) {
          element.addClass('active');
        }
      });
    }
  };
});