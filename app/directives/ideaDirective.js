app.directive("idea", function () {
    return {
        templateUrl: 'views/directives/idea.html',
        restrict: 'E',
        link: function ($scope, element, attr) {
            $scope.link = attr.link;
        }
    };
});