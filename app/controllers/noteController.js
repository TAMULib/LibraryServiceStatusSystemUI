app.controller('NoteController', function ($controller, $scope, Note, NoteRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractScheduleController', {
        $scope: $scope
    }));

    $scope.noteRepo = NoteRepo;

    $scope.services = ServiceRepo.getAll();

    $scope.modalData = {
        title: "Edit",
        type: "note"
    };

    $scope.forms = {};

    $scope.noteToDelete = {};

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

    $scope.weaverTable = {
        pageSettings: $scope.noteRepo.getPageSettings(),
        tableParams: $scope.noteRepo.getTableParams(),
        columns: [{
                gloss: 'Service',
                property: 'service.name',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Title',
                property: 'title',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Body',
                property: 'body',
                filterable: true,
                sortable: false
            },
            {
                gloss: 'Type',
                property: 'noteType',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Last Modified',
                property: 'lastModified',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Pinned',
                property: 'pinned',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Active',
                property: 'active',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Actions',
                filterable: false,
                sortable: false
            }
        ],
        activeSort: [{
                property: 'service.name',
                direction: 'ASC'
            },
            {
                property: 'lastModified',
                direction: 'DESC'
            }
        ]
    };

    ServiceRepo.ready().then(function () {

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
            $scope.noteRepo.create($scope.noteData).then(function (res) {
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
        	$scope.noteData.dirty(true);
            $scope.noteRepo.update($scope.noteData).then(function (res) {
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
            $scope.noteToDelete.delete().then(function (res) {
                if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                    $scope.closeModal();
                    $scope.deleting = false;
                    $scope.noteToDelete = {};
                }
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