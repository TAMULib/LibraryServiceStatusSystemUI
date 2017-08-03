app.repo("ServiceRepo", function ServiceRepo(WsApi) {

    var serviceRepo = this;

    var getNotesService = function (note) {
        var service = serviceRepo.findById(note.service.id);
        if (service.notes === undefined) {
            service.notes = [];
        }
        return service;
    }

    serviceRepo.addNote = function (note) {
        var service = getNotesService(note);
        service.notes.push(note);
    };

    serviceRepo.removeNote = function (note) {
        var service = getNotesService(note);
        for (var i in service.notes) {
            if (service.notes[i].id === note.id) {
                service.notes.splice(i, 1);
                break;
            }
        }
    };

    serviceRepo.createListen = WsApi.listen(serviceRepo.mapping.createListen);

    serviceRepo.createListen.then(null, null, function (response) {
        serviceRepo.add(angular.fromJson(response.body).payload.Service);
    });

    serviceRepo.deleteListen = WsApi.listen(serviceRepo.mapping.deleteListen);

    serviceRepo.deleteListen.then(null, null, function (response) {
        serviceRepo.remove(serviceRepo.findById(angular.fromJson(response.body).payload.Long));
    });

    return serviceRepo;

});
