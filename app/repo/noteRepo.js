app.repo("NoteRepo", function NoteRepo($location, $q, $timeout, WsApi, Note, ServiceRepo, TableFactory) {

    var noteRepo = this;

    noteRepo.fetchById = function (noteId) {
        var note = new Note();
        angular.extend(noteRepo.mapping.instantiate, {
            'method': noteId
        });
        note.fetch();
        return note;
    };

    noteRepo.getPageSettings = function () {
        return table.getPageSettings();
    };

    noteRepo.getTableParams = function () {
        return table.getTableParams();
    };

    noteRepo.getNotesByService = function (pageSettings) {
        angular.extend(noteRepo.mapping.query, {
            'data': pageSettings
        });
        return WsApi.fetch(noteRepo.mapping.query);
    };

    noteRepo.fetchPage = function () {
        table.getPageSettings().filters = {};
        angular.extend(noteRepo.mapping.page, {
            'data': table.getPageSettings()
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
            if (table.getPageSettings().pageNumber > 1 && table.getPageSettings().pageNumber > page.totalPages) {
                table.setPage(page.totalPages);
                noteRepo.fetchPage().then(function (response) {
                    var page = angular.fromJson(response.body).payload.PageImpl;
                    noteRepo.empty();
                    noteRepo.addAll(page.content);
                });
            }
        });
        return pagePromise;
    };

    var table = TableFactory.buildTable({
        pageNumber: $location.search().page ? $location.search().page : 1,
        pageSize: $location.search().size ? $location.search().size : 10,
        direction: 'DESC',
        properties: ['title'],
        filters: {},
        counts: [5, 10, 25, 50, 100],
        page: noteRepo.page,
        data: noteRepo.getContents()
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

    WsApi.listen(noteRepo.mapping.createListen).then(null, null, function (response) {
        ServiceRepo.addNote(new Note(angular.fromJson(response.body).payload.Note));
        table.getTableParams().reload();
    });

    WsApi.listen(noteRepo.mapping.updateListen).then(null, null, function (response) {
        var note = new Note(angular.fromJson(response.body).payload.Note);
        ServiceRepo.updateNote(note);
        updateNote(note);
    });

    WsApi.listen(noteRepo.mapping.deleteListen).then(null, null, function (response) {
        ServiceRepo.removeNoteById(angular.fromJson(response.body).payload.Long);
        table.getTableParams().reload();
    });

    return noteRepo;

});