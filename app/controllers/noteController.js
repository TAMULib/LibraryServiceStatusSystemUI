app.controller('NoteController', function ($controller, $scope, Note, NoteRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractScheduleController', {
        $scope: $scope
    }));

    $scope.noteTypes = [{
            value: "ENHANCEMENT",
            gloss: 'Enhancement'
        },
        {
            value: "ISSUE",
            gloss: 'Issue'
        },
        {
            value: "MAINTENANCE",
            gloss: 'Maintenance'
        },
        {
            value: "REPORT",
            gloss: 'Report'
        },
        {
            value: "RESOLUTION",
            gloss: 'Resolution'
        },
        {
            value: "SCHEDULED_DOWNTIME",
            gloss: 'Scheduled Downtime'
        },
    ];

    $scope.noteRepo = NoteRepo;

    $scope.modalData = {
        title: "Edit",
        type: "note"
    };

    $scope.forms = {};

    $scope.noteToDelete = {};

    $scope.services = ServiceRepo.getAll();

    ServiceRepo.ready().then(function () {

        $scope.tableParams = NoteRepo.getTableParams();

        NoteRepo.getPageSettings().filters = {};
        NoteRepo.getPageSettings().sort = [{
            property: 'service.name',
            direction: 'ASC'
        }, {
            property: 'lastModified',
            direction: 'DESC'
        }];

        $scope.resetNotes = function () {
            if ($scope.noteData) {
                $scope.noteData.refresh();
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
                active: false,
                pinned: false,
                service: $scope.services[0],
                noteType: 'ENHANCEMENT'
            });
            $scope.closeModal();
        };

        $scope.resetNotes();

        $scope.createNote = function () {
            NoteRepo.create($scope.noteData).then(function (res) {
                if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
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
                if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                    $scope.resetNotes();
                }
            });
        };

        $scope.editSchedule = function (note) {
            $scope.data = note;
            $scope.openModal('#editScheduleModal');
        };

        $scope.resetSchedule = function () {
            $scope.resetNotes();
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

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists textcolor",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | numlist bullist | forecolor backcolor"
    };

});