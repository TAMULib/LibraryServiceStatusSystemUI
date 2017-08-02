app.controller('NoteController', function ($controller, $scope, $q, NgTableParams, UserService, Note, NoteRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

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
    }, {
        total: 0,
        getData: function (params) {
            return NoteRepo.ready().then(function (notes) {
                var notes = NoteRepo.getAll();
                params.total(notes.length);
                return notes;
            });
        }
    });


    $scope.resetNotes = function () {
        if ($scope.noteData) {
            $scope.noteData.clearValidationResults();
        }
        for (var key in $scope.forms) {
            if (!$scope.forms[key].$pristine) {
                $scope.forms[key].$setPristine();
                $scope.forms[key].$setUntouched();
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

    $scope.createNote = function () {
        NoteRepo.create($scope.noteData).then(function (res) {
            if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
                $scope.resetNotes();
            }
        });
    };

    $scope.editNote = function (note) {
        $scope.noteData = note;
        $scope.openModal('#editNoteModal');
    };

    $scope.updateNote = function () {
        NoteRepo.update($scope.noteData).then(function (res) {
            if (angular.fromJson(res.body).meta.type === 'SUCCESS') {
                $scope.resetNotes();
            }
        });
    };

    $scope.confirmDelete = function (note) {
        $scope.openModal('#deleteNoteModal');
        $scope.noteToDelete = note;
    }

    $scope.deleteNote = function () {
        $scope.deleting = true;
        $scope.noteToDelete.delete().then(function () {
            $scope.closeModal();
            $scope.deleting = false;
            NoteRepo.removeAndUpdateService($scope.noteToDelete);
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
