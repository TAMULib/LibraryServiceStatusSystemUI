app.model("Service", function Service($q, Note, NoteRepo, ServiceRepo) {

    return function Service() {

        var service = this;

        service.before(function () {
            if (service.notes) {
                if (service.notes.length > 0) {

                    var notePromises = []

                    for (var i in service.notes) {
                        var noteId = service.notes[i];
                        notePromises.push($q(function (resolve) {
                            NoteRepo.fetchAndAddById(noteId).then(function (note) {
                                resolve(new Note(note));
                            });
                        }));
                    }

                    $q.all(notePromises).then(function (serviceNotes) {
                        angular.extend(service, {
                            notes: serviceNotes
                        });
                    });
                }
            }
        });

        service.removeNote = function (note) {
            for (var i in service.notes) {
                if (service.notes[i].id === note.id) {
                    service.notes.splice(i, 1);
                    ServiceRepo.update(service);
                }
            }
        };

        return service;
    };

});
