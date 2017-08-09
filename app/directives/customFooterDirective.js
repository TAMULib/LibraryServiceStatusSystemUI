app.directive('customFooter', function ($controller) {
    return {
        templateUrl: 'views/directives/footer.html',
        restrict: 'E',
        replace: false,
        transclude: true,
        scope: {
            login: '&',
            anonymous: '='
        },
        link: function ($scope, element, attr) {
            $scope.loginuser = function () {
                $scope.login({});
            };
        }
    };
});