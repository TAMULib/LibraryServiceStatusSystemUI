app.controller('ManagementController', function ($controller, $scope) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

});