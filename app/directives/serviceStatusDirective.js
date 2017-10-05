app.directive("serviceStatus", function () {
    return {
        templateUrl: 'views/directives/serviceStatus.html',
        restrict: 'E',
        scope: {
            "model": "="
        },
        link: function ($scope, element, attr) {
            $scope.$watch('model', function (value) {
                $scope.display = $scope.model.isAuto ? 'AUTO' : $scope.model.status;
            });

            $scope.updateModel = function () {
                if ($scope.display === 'AUTO') {
                    $scope.model.isAuto = true;
                    $scope.model.status = 'UP';
                } else {
                    $scope.model.isAuto = false;
                    $scope.model.status = $scope.display;
                }
            };
        }
    };
});