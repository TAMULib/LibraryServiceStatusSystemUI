app.repo("NoteRepo", function NoteRepo($q, WsApi, Note, ServiceRepo) {

    var noteRepo = this;

    noteRepo.getNotesByService = function (service) {
        angular.extend(noteRepo.mapping.getByService, {
            'data': service
        });
        return WsApi.fetch(noteRepo.mapping.getByService);
    };

    noteRepo.page = function (number, size, direction, properties, filters) {
        return $q(function (resolve) {
            if (!properties) {
                properties = 'title';
            }
            if (!direction) {
                direction = 'ASC';
            }
            angular.extend(noteRepo.mapping.page, {
                'data': {
                    'page': {
                        'number': number,
                        'size': size
                    },
                    'direction': {
                        'properties': properties,
                        'direction': direction
                    },
                    'filters': filters
                }
            });
            WsApi.fetch(noteRepo.mapping.page).then(function (data) {
                var page = angular.fromJson(data.body).payload.PageImpl;
                noteRepo.addAll(page.content);
                resolve(page);
            });
        });

    };

    noteRepo.createListen = WsApi.listen(noteRepo.mapping.createListen);

    noteRepo.createListen.then(null, null, function (response) {
        var note = angular.fromJson(response.body).payload.Note;
        noteRepo.add(note);
        ServiceRepo.addNote(noteRepo.findById(note.id));
    });

    noteRepo.deleteListen = WsApi.listen(noteRepo.mapping.deleteListen);

    noteRepo.deleteListen.then(null, null, function (response) {
        var note = noteRepo.findById(angular.fromJson(response.body).payload.Long);
        noteRepo.remove(note);
        ServiceRepo.removeNote(note);
    });

    return noteRepo;

});
