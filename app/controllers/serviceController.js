app.controller('ServiceController', function($controller, $scope, Service, ServiceRepo, NgTableParams) {

  angular.extend(this, $controller('AppAbstractController', {$scope: $scope}));

  $scope.serviceRepo = ServiceRepo;

  $scope.services = ServiceRepo.getAll();

  $scope.serviceToDelete = {};

  $scope.forms = {};

  $scope.resetServices = function() {
    if ($scope.serviceData) {
      $scope.serviceData.clearValidationResults();
    }
    for (var key in $scope.forms) {
        if (!$scope.forms[key].$pristine) {
            $scope.forms[key].$setPristine();
        }
    }
    $scope.serviceData = new Service({
      'name': '',
      'isPublic': false,
      'onShortList': false,
      'isAuto': false,
      'status': 'UP'
    });
    $scope.closeModal();
    $scope.serviceRepo.reset();
  }
  $scope.resetServices();

  $scope.createService = function() {
    if ($scope.serviceData.isAuto) {
      $scope.serviceData.status = 'UP';
    } else {
      $scope.serviceData.isAuto = false;
    }
    $scope.serviceRepo.create($scope.serviceData).then(function (res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetServices();
      }
    });
  };

  $scope.editService = function(service) {
    $scope.serviceData = service;
    $scope.openModal('#editServiceModal');
  };

  $scope.updateService = function() {
    $scope.serviceRepo.update($scope.serviceData).then(function(res) {
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
    $scope.openModal('#deleteServiceModal');
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

  $scope.tinymceOptions = {
    toolbar1: "formatselect,bold,italic,separator,bullist,numlist,undo,redo",
    theme: "modern",
    plugins: "link",
    selector: 'textarea'
  };
});