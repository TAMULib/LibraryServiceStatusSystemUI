app.controller('ServiceController', function($controller, $scope, ServiceRepo) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.serviceRepo = ServiceRepo;

  $scope.services = ServiceRepo.getAll();

  $scope.resetServices = function() {
    $scope.serviceRepo.clearValidationResults();

    $scope.closeModal();
  }

  $scope.modalData = {
    'isPublic': true,
    'onShortList': true,
    'status': 'UP'
  };

  $scope.createService = function() {
    console.log($scope.modalData);
    $scope.serviceRepo.create($scope.modalData);
  }
});