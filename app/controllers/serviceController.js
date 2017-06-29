app.controller('ServiceController', function($controller, $scope, ServiceRepo) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));
});