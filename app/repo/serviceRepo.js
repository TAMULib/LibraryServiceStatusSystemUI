app.repo("ServiceRepo", function ServiceRepo($q, $timeout, WsApi) {

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
        if (note.pinned || note.active) {
            var service = getNotesService(note);
            service.notes.push(note);
        }
    };

    serviceRepo.updateNote = function (note) {
        var service = getNotesService(note);
        for (var i in service.notes) {
            if (service.notes[i].id === note.id) {
                if (note.pinned || note.active) {
                    angular.extend(service.notes[i], note);
                } else {
                    service.notes.splice(i, 1);
                }
                return;
            }
        }
        if (note.pinned || note.active) {
            service.notes.push(note);
        }
    };

    serviceRepo.removeNoteById = function (id) {
        var services = serviceRepo.getAll();
        for (var i in services) {
            checkCreateNotes(services[i]);
            for (var j in services[i].notes) {
                if (services[i].notes[j].id === id) {
                    services[i].notes.splice(j, 1);
                    return;
                }
            }
        }
    };

    serviceRepo.submitRequest = function (request) {
        angular.extend(serviceRepo.mapping.submitRequest, {
            'method': request.type === 'FEATURE' ? 'feature' : 'issue',
            'data': request
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(serviceRepo.mapping.submitRequest).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.meta.message);
                } else {
                    reject();
                }
            });
        });
    };

    WsApi.listen(serviceRepo.mapping.createListen).then(null, null, function (response) {
        $timeout(function () {
            serviceRepo.reset();
        }, 250);
    });

    WsApi.listen(serviceRepo.mapping.updateListen).then(null, null, function (response) {
        $timeout(function () {
            serviceRepo.reset();
        }, 250);
    });

    WsApi.listen(serviceRepo.mapping.deleteListen).then(null, null, function (response) {
        $timeout(function () {
            serviceRepo.reset();
        }, 250);
    });

    return serviceRepo;

});