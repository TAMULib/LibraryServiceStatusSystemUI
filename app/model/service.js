app.model("Service", function Service($location, NoteRepo, Note) {

    return function Service() {
        var service = this;

        service.getNotes = function (pinned) {
            service.notes = [];
            NoteRepo.getNotesByService(service, pinned).then(function (response) {
                var notes = angular.fromJson(response.body).payload["ArrayList<Note>"];
                for (var i in notes) {
                    service.notes.push(new Note(notes[i]));
                }
            });
        };

        return service;
    };

});
