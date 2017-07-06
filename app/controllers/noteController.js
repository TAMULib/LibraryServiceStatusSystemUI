app.controller('NoteController', function($controller, $scope, NoteRepo, NgTableParams, ServiceRepo, Note, UserService) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.notes = NoteRepo.getAll();

  $scope.noteRepo = NoteRepo;

  $scope.forms = {};

  $scope.services = ServiceRepo.getAll();

  var buildTable = function() {
    $scope.tableParams = new NgTableParams({}, {
      counts: [],
      filterDelay: 0,
      dataset: NoteRepo.getAll()
    });
  };

  NoteRepo.ready().then(function() {
    buildTable();
    $scope.tableParams.reload();
  });

  $scope.resetServices = function() {
    $scope.modalData = new Note({});
    $scope.closeModal();
  };
  $scope.resetServices();

  $scope.createNote = function() {
    if (!Array.isArray($scope.modalData.services)) {
      $scope.modalData.services = [$scope.modalData.services];
    }
    $scope.noteRepo.create($scope.modalData, UserService.getCurrentUser().uin).then(function (res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetServices();
      }
    });
  };

  $scope.noteTypes = {
    'ENHANCEMENT': 'Enhancement',
    'ISSUE': 'Issue',
    'RESOLUTION': 'Resolution',
    'REPORT': 'Report',
    'SCHEDULED_DOWNTIME': 'Scheduled Downtime',
    'MAINTENANCE': 'Maintenance'
  };
});