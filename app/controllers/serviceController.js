app.controller('ServiceController', function($controller, $scope, ServiceRepo, NgTableParams) {

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
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetServices();
      }
    });

  }

  $scope.clearServiceUrl = function() {
    delete $scope.modalData.serviceUrl;
  }

  var buildTable = function() {
    return new NgTableParams({}, {
      counts: [],
      filterDelay: 0,
      dataset: ServiceRepo.getAll()
    });
  };

  ServiceRepo.ready().then(function() {

    $scope.tableParams = buildTable();
    $scope.tableParams.reload();

  });
});