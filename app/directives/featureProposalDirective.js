app.directive("featureProposal", function () {
    return {
        templateUrl: 'views/directives/featureProposal.html',
        restrict: 'E',
        link: function ($scope, element, attr) {
            $scope.link = attr.link;
        }
    };
});