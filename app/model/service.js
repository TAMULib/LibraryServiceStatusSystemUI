app.model("Service", function Service(NoteRepo) {

    return function Service() {
        var service = this;
        service.before(function () {
            if (service.id) {
                NoteRepo.getNotesByService(service).then(function (response) {
                    var notes = angular.fromJson(response.body).payload["ArrayList<Note>"];
                    for (var i in notes) {
                        NoteRepo.add(notes[i]);
                        notes[i] = NoteRepo.findById(notes[i].id);
                    }
                    service.notes = notes;
                });
            }
        });
        return service;
    };

});
