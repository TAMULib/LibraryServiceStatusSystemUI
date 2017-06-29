app.controller('ServiceController', function($controller, $scope, ServiceRepo) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.serviceRepo = ServiceRepo;

  $scope.services = ServiceRepo.getAll();

  $scope.resetServices = function() {
    $scope.serviceRepo.clearValidationResults();
    $scope.modalData = {
      'isPublic': false,
      'onShortList': false
    };
    $scope.closeModal();
  }

  $scope.modalData = {
    'isPublic': false,
    'onShortList': false
  };

  $scope.createService = function() {
    console.log($scope.modalData);
    $scope.serviceRepo.create($scope.modalData).then(function (res) {
      if (angular.fromJson(res.body).meta.type != 'SUCCESS') {
        console.log(res);
      }
    });
  }

  $scope.clearServiceUrl = function() {
    delete $scope.modalData.serviceUrl;
  }
});