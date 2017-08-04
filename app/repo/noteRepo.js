app.repo("NoteRepo", function NoteRepo($q, $location, $timeout, NgTableParams, WsApi, Note, ServiceRepo) {

    var noteRepo = this;

    var pageSettings = {
        pageNumber: $location.search().page ? $location.search().page : 1,
        pageSize: $location.search().size ? $location.search().size : 10,
        direction: 'DESC',
        properties: ['title'],
        filters: {}
    };

    var setPage = function (pageNumber) {
        pageSettings.pageNumber = pageNumber;
        tableParams.page(pageSettings.pageNumber);
        $location.search('page', pageSettings.pageNumber);
    };

    var setSize = function (pageSize) {
        pageSettings.pageSize = pageSize;
        $location.search('size', pageSettings.pageSize);
    };

    var tableParams = new NgTableParams({
        page: pageSettings.pageNumber,
        count: pageSettings.pageSize,
        sorting: {
            name: pageSettings.direction
        },
        filter: {

        }
    }, {
        counts: [5, 10, 25, 50, 100],
        getData: function (params) {
            setPage(params.page());
            setSize(params.count());
            return noteRepo.page().then(function (page) {
                params.total(page.totalElements);
                angular.element('.ng-table-pager select option[value="' + params.count() + '"]').prop('selected', true);
                return noteRepo.getContents();
            });
        }
    });

    var updateNote = function (note) {
        var notes = noteRepo.getContents();
        for (var i in notes) {
            if (notes[i].id === note.id) {
                angular.extend(notes[i], note);
                return;
            }
        }
    };

    noteRepo.getPageSettings = function () {
        return pageSettings;
    };

    noteRepo.getTableParams = function () {
        return tableParams;
    };

    noteRepo.getNotesByService = function (service, pinned) {
        angular.extend(noteRepo.mapping.getByService, {
            'method': 'by-service/' + pinned,
            'data': service
        });
        return WsApi.fetch(noteRepo.mapping.getByService);
    };

    noteRepo.fetchPage = function () {
        angular.extend(noteRepo.mapping.page, {
            'data': pageSettings
        });
        return WsApi.fetch(noteRepo.mapping.page);
    };

    noteRepo.page = function () {
        var pagePromise = $q(function (resolve) {
            $timeout(function () {
                noteRepo.fetchPage().then(function (response) {
                    var page = angular.fromJson(response.body).payload.PageImpl;
                    noteRepo.empty();
                    noteRepo.addAll(page.content);
                    resolve(page);
                });
            }, 100);
        });
        pagePromise.then(function (page) {
            if (pageSettings.pageNumber > 1 && pageSettings.pageNumber > page.totalPages) {
                setPage(page.totalPages);
                noteRepo.fetchPage().then(function (response) {
                    var page = angular.fromJson(response.body).payload.PageImpl;
                    noteRepo.empty();
                    noteRepo.addAll(page.content);
                });
            }
        });
        return pagePromise;
    };

    WsApi.listen(noteRepo.mapping.createListen).then(null, null, function (response) {
        ServiceRepo.addNote(new Note(angular.fromJson(response.body).payload.Note));
        tableParams.reload();
    });

    WsApi.listen(noteRepo.mapping.updateListen).then(null, null, function (response) {
        var note = new Note(angular.fromJson(response.body).payload.Note);
        ServiceRepo.updateNote(note);
        updateNote(note);
    });

    WsApi.listen(noteRepo.mapping.deleteListen).then(null, null, function (response) {
        ServiceRepo.removeNoteById(angular.fromJson(response.body).payload.Long);
        tableParams.reload();
    });

    return noteRepo;

});

app.directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return '' + val;
            });
        }
    };
});
