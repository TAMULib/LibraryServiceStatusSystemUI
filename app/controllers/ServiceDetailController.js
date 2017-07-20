app.controller('ServiceDetailController', function($controller, $routeParams, $scope, Service, ServiceRepo) {

  angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

  ServiceRepo.ready().then(function() {
    $scope.service = ServiceRepo.findById($routeParams.serviceId);
  });

});