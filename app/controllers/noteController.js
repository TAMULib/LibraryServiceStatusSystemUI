app.controller('NoteController', function($controller, $scope, NoteRepo, NgTableParams, ServiceRepo, Note, UserService) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.notes = NoteRepo.getAll();

  $scope.noteRepo = NoteRepo;

  $scope.noteRepo = NoteRepo;

  $scope.forms = {};

  $scope.noteToDelete = {};

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

  $scope.resetNotes = function() {
    $scope.modalData = new Note({});
    $scope.closeModal();
    $scope.noteRepo.reset();
  };
  $scope.resetNotes();

  $scope.createNote = function() {
    if (!Array.isArray($scope.modalData.services)) {
      $scope.modalData.services = [$scope.modalData.services];
    }
    $scope.noteRepo.create($scope.modalData, UserService.getCurrentUser().uin).then(function (res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetNotes();
      }
    });
  };

  $scope.editNote = function(note) {
    $scope.modalData = note;
    $scope.openModal('#editNoteModal');
  };

  $scope.updateNote = function() {
    $scope.noteRepo.update($scope.modalData).then(function(res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetNotes();
      }
    });
  };

  $scope.confirmDelete = function(note) {
    $scope.openModal('#deleteNoteModal');
    $scope.noteToDelete = note;
  }

  $scope.deleteNote = function() {
    $scope.deleting = true;
    $scope.noteToDelete.delete().then(function() {
      $scope.closeModal();
      $scope.deleting = false;
      ServiceRepo.remove($scope.noteToDelete);
      $scope.noteToDelete = {};
      $scope.tableParams.reload();
    })
  }

  $scope.noteTypes = {
    'ENHANCEMENT': 'Enhancement',
    'ISSUE': 'Issue',
    'RESOLUTION': 'Resolution',
    'REPORT': 'Report',
    'SCHEDULED_DOWNTIME': 'Scheduled Downtime',
    'MAINTENANCE': 'Maintenance'
  };
});
