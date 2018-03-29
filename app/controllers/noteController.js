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

    $scope.filters = [
        {
            gloss: 'Service',
            property: 'service.name'
        },
        {
            gloss: 'Title',
            property: 'title'
        },
        {
            gloss: 'Body',
            property: 'body'
        },
        {
            gloss: 'Type',
            property: 'noteType'
        },
        {
            gloss: 'Last Modified',
            property: 'lastModified'
        },
        {
            gloss: 'Pinned',
            property: 'pinned'
        },
        {
            gloss: 'Active',
            property: 'active'
        }
    ];
    
    $scope.filter = $scope.filters[0];

    $scope.activeFilters = NoteRepo.getPageSettings().filters;

    var activeSort = NoteRepo.getPageSettings().sort = [{
        property: 'service.name',
        direction: 'ASC'
    }, {
        property: 'lastModified',
        direction: 'DESC'
    }];
    
    $scope.selectFilter = function(filter) {
        $scope.filter = filter;
    };
    
    $scope.removeFilter = function (prop, v) {
        $scope.activeFilters[prop].splice($scope.activeFilters[prop].indexOf(v), 1);
        if($scope.activeFilters[prop].length === 0) {
            delete $scope.activeFilters[prop];
        }
        NoteRepo.getTableParams().reload();
    };
    
    $scope.applyFilter = function(filter) {
        if($scope.activeFilters[filter.property]) {
            $scope.activeFilters[filter.property].push(filter.value);
        } else {
            $scope.activeFilters[filter.property] = [filter.value];
        }
        NoteRepo.getTableParams().reload();
        delete $scope.filter.value;
    };

    $scope.lookupGloss = function(prop) {
        for(var i in $scope.filters) {
            var filter = angular.copy($scope.filters[i]);
            if(filter.property === prop) {
                return filter.gloss;
            }
        }
    };
    
    $scope.unsorted = function(prop) {
        for(var i in activeSort) {
            var sort = activeSort[i];
            if(sort.property === prop) {
                return false;
            }
        }
        return true;
    };
    
    $scope.asc = function(prop) {
        for(var i in activeSort) {
            var sort = activeSort[i];
            if(sort.property === prop && sort.direction === 'ASC') {
                return true;
            }
        }
        return false;
    };
    
    $scope.desc = function(prop) {
        for(var i in activeSort) {
            var sort = activeSort[i];
            if(sort.property === prop && sort.direction === 'DESC') {
                return true;
            }
        }
        return false;
    };
    
    $scope.toggleSort = function(prop) {
        var asc = true;
        for(var i in activeSort) {
            var sort = activeSort[i];
            if(sort.property === prop) {
                if(sort.direction === 'ASC') {
                    sort.direction = 'DESC';
                } else {
                    activeSort.splice(i, 1);
                }
                asc = false;
                break;
            }
        }
        if(asc) {
            activeSort.push({
                property: prop,
                direction: 'ASC'
            });
        }
        NoteRepo.getTableParams().reload();
    };

    ServiceRepo.ready().then(function () {

        $scope.tableParams = NoteRepo.getTableParams();

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