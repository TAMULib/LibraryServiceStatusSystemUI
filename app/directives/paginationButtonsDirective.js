app.directive("paginationButtons", function() {
  return {
    templateUrl: 'views/directives/paginationButtons.html',
    restrict: 'E',
    $scope: {
      'pageSettings': '='
    },
    link: function($scope, element, attr) {

      $scope.pages = [];
      
      element.on('click', function(elem) {
        var target = $(elem.target);
        if (target.find(">:first-child").is("input")) {
          $scope.$apply(function() {
            $scope.pageSettings.pageSize = target.find("input")[0].id;
          });
        } else if (target.hasClass("btn")) {
          $scope.$apply(function() {
            if (target[0].id === 'previous') {
              $scope.pageSettings.pageNumber = ($scope.pageSettings.pageNumber == 0 ? 0 : $scope.pageSettings.pageNumber - 1);
            } else if (target[0].id === 'next') {
              $scope.pageSettings.pageNumber = ($scope.pageSettings.pageNumber == $scope.pageSettings.totalPages ? $scope.pageSettings.pageNumber : $scope.pageSettings.pageNumber + 1);
            } else {
              console.log(target[0].id);
              $scope.pageSettings.pageNumber = target[0].id;
            }
          });
        }
      });

      $scope.$watch('pageSettings', function(newVal) {
        console.log(newVal);
        element.removeClass('active');
        if (!$scope.pageSettings && newVal === $scope.pageSettings.pageSize) {
          element.addClass('active');
        }
        if ($scope.pageSettings.totalPages) {
          setPageArray($scope.pageSettings.totalPages);
        }
      });

      $scope.isActive = function(index) {
        var isActive = false;
        if (index !== 'previous' || index !== 'next') {
          isActive = $scope.pageSettings.pageNumber === (index - 1);
        }
        return isActive;
      }

      var setPageArray = function(num) {
        $scope.pages.length = 0;
        for (i = 0; i < num; i++) {
          $scope.pages.push({[i]: i + 1});
        }
      };
    }
  };
});