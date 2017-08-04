app.repo("NoteRepo", function NoteRepo($q, WsApi, Note, ServiceRepo) {

    var noteRepo = this;

    noteRepo.pageSettings = {
        pageNumber: 0,
        pageSize: 10,
        direction: 'DESC',
        properties: ['title'],
        filters: {}
    };

    noteRepo.getNotesByService = function (service) {
        angular.extend(noteRepo.mapping.getByService, {
            'data': service
        });
        return WsApi.fetch(noteRepo.mapping.getByService);
    };

    noteRepo.page = function () {
        return $q(function (resolve) {
            angular.extend(noteRepo.mapping.page, {
                'data': noteRepo.pageSettings
            });
            WsApi.fetch(noteRepo.mapping.page).then(function (data) {
                var page = angular.fromJson(data.body).payload.PageImpl;
                noteRepo.empty();
                noteRepo.addAll(page.content);
                resolve(page);
            });
        });
    };

    WsApi.listen(noteRepo.mapping.createListen).then(null, null, function (response) {
        ServiceRepo.addNote(new Note(angular.fromJson(response.body).payload.Note));
        noteRepo.page();
    });

    WsApi.listen(noteRepo.mapping.updateListen).then(null, null, function (response) {
        ServiceRepo.updateNote(new Note(angular.fromJson(response.body).payload.Note));
        noteRepo.page();
    });

    WsApi.listen(noteRepo.mapping.deleteListen).then(null, null, function (response) {
        ServiceRepo.removeNoteById(angular.fromJson(response.body).payload.Long);
        noteRepo.page();
    });

    return noteRepo;

});
