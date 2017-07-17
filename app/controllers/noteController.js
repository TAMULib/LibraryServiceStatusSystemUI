app.controller('NoteController', function($q, $controller, $scope, NoteRepo, NgTableParams, ServiceRepo, Note, UserService) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));
  
  $scope.forms = {};

  $scope.noteToDelete = {};

  $scope.services = ServiceRepo.getAll();
  $scope.tableParams = new NgTableParams({
            page: 0,
            count: 10,
            sorting: {
                name: 'asc'
            },
            filter: {
             
            }
    }, 
    {
      total: 0,
      getData: function ($defer, params) {
        NoteRepo.ready().then(function(notes) {
          $defer.resolve(NoteRepo.getAll());
        });
      }
    });


  $scope.resetNotes = function() {
    if ($scope.noteData) {
      $scope.noteData.clearValidationResults();
    }
    for (var key in $scope.forms) {
        if (!$scope.forms[key].$pristine) {
            $scope.forms[key].$setPristine();
        }
    }
    $scope.noteData = {};
    $scope.noteData = new Note({
      'title': ''
    });
    $scope.closeModal();
    NoteRepo.reset();
  };
 
 $scope.resetNotes();

  $scope.createNote = function() {
    NoteRepo.create($scope.noteData).then(function (res) {
      if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
        $scope.resetNotes();
      }
    });
  };

  $scope.editNote = function(note) {
    $scope.noteData = note;
    $scope.openModal('#editNoteModal');
  };

  $scope.updateNote = function() {
    NoteRepo.update($scope.noteData).then(function(res) {
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
