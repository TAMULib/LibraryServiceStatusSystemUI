app.controller('ServiceController', function($controller, $scope, Service, ServiceRepo, NgTableParams) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.serviceRepo = ServiceRepo;

  $scope.services = ServiceRepo.getAll();

  $scope.serviceToDelete = {};

  $scope.forms = {};

  $scope.resetServices = function() {
    $scope.modalData = new Service({
      'isPublic': false,
      'onShortList': false
    });
    $scope.closeModal();
    $scope.serviceRepo.reset();
  }
  $scope.resetServices();

  $scope.createService = function() {
    if ($scope.modalData.isAuto) {
      $scope.modalData.status = 'UP';
    } else {
      $scope.modalData.isAuto = false;
    }
    $scope.serviceRepo.create($scope.modalData).then(function (res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetServices();
      }
    });

  };

  $scope.editService = function(service) {
    $scope.modalData = service;
    $scope.openModal('#editServiceModal');
  };

  $scope.updateService = function() {
    $scope.serviceRepo.update($scope.modalData).then(function(res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetServices();
      }
      
    });
  };

  var buildTable = function() {
    $scope.tableParams = new NgTableParams({}, {
      counts: [],
      filterDelay: 0,
      dataset: ServiceRepo.getAll()
    });
  };

  ServiceRepo.ready().then(function() {
    buildTable();
    $scope.tableParams.reload();
  });

  $scope.confirmDelete = function(service) {
    $scope.openModal('#confirmDeleteModal');
    $scope.serviceToDelete = service;
  }

  $scope.deleteService = function() {
    $scope.deleting = true;
    $scope.serviceToDelete.delete().then(function() {
      $scope.closeModal();
      $scope.deleting = false;
      ServiceRepo.remove($scope.serviceToDelete);
      $scope.serviceToDelete = {};
      $scope.tableParams.reload();
    })
  }
});