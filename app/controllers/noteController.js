app.controller('NoteController', function ($controller, $scope, Note, NoteRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.noteTypes = {
        ENHANCEMENT: 'Enhancement',
        ISSUE: 'Issue',
        RESOLUTION: 'Resolution',
        REPORT: 'Report',
        SCHEDULED_DOWNTIME: 'Scheduled Downtime',
        MAINTENANCE: 'Maintenance'
    };

    $scope.forms = {};

    $scope.noteToDelete = {};

    $scope.services = ServiceRepo.getAll();

    ServiceRepo.ready().then(function () {

        $scope.tableParams = NoteRepo.getTableParams();

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
            $scope.noteData = new Note({
                title: '',
                pinned: false,
                service: $scope.services[0],
                noteType: 'ENHANCEMENT'
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
        };

        $scope.deleteNote = function () {
            $scope.deleting = true;
            $scope.noteToDelete.delete().then(function () {
                $scope.closeModal();
                $scope.deleting = false;
                $scope.noteToDelete = {};
            });
        };

    });

});
