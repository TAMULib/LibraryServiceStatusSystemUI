app.controller('ServiceDetailController', function($controller, $routeParams, $scope, Service, ServiceRepo) {

  angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));
  console.log($routeParams.serviceId);
  $scope.service = ServiceRepo.findById($routeParams.serviceId);

});