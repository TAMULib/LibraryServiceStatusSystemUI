app.model("Service", function Service(NoteRepo, Note) {

    return function Service() {
        var service = this;
        service.before(function () {
            if (service.id) {
                service.notes = [];
                NoteRepo.getNotesByService(service).then(function (response) {
                    var notes = angular.fromJson(response.body).payload["ArrayList<Note>"];
                    for (var i in notes) {
                        service.notes.push(new Note(notes[i]));
                    }
                });
            }
        });
        return service;
    };

});
