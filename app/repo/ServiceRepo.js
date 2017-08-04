app.repo("ServiceRepo", function ServiceRepo(WsApi) {

    var serviceRepo = this;

    var checkCreateNotes = function (service) {
        if (service.notes === undefined) {
            service.notes = [];
        }
    };

    var getNotesService = function (note) {
        var service = serviceRepo.findById(note.service.id);
        checkCreateNotes(service);
        return service;
    };

    serviceRepo.addNote = function (note) {
        var service = getNotesService(note);
        service.notes.push(note);
    };

    serviceRepo.updateNote = function (note) {
        var service = getNotesService(note);
        for (var i in service.notes) {
            if (service.notes[i].id === note.id) {
                angular.extend(service.notes[i], note);
                break;
            }
        }
    };

    serviceRepo.removeNoteById = function (id) {
        var services = serviceRepo.getAll();
        for (var i in services) {
            checkCreateNotes(services[i]);
            for (var j in services[i].notes) {
                if (services[i].notes[j].id === id) {
                    services[i].notes.splice(j, 1);
                    break;
                }
            }
        }
    };

    WsApi.listen(serviceRepo.mapping.createListen).then(null, null, function (response) {
        serviceRepo.add(angular.fromJson(response.body).payload.Service);
    });

    WsApi.listen(serviceRepo.mapping.updateListen).then(null, null, function (response) {
        var updatedService = angular.fromJson(response.body).payload.Service;
        var service = serviceRepo.findById(updatedService.id);
        angular.extend(service, updatedService);
    });

    WsApi.listen(serviceRepo.mapping.deleteListen).then(null, null, function (response) {
        serviceRepo.remove(serviceRepo.findById(angular.fromJson(response.body).payload.Long));
    });

    return serviceRepo;

});
