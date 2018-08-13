app.repo("ServiceRepo", function ServiceRepo($q, $timeout, WsApi, Service, TableFactory) {

    var serviceRepo = this;

    serviceRepo.getPageSettings = function () {
        return table.getPageSettings();
    };

    serviceRepo.getTableParams = function () {
        return table.getTableParams();
    };

    serviceRepo.fetchPage = function (pageSettings) {
        angular.extend(serviceRepo.mapping.page, {
            'data': pageSettings ? pageSettings : table.getPageSettings()
        });
        return WsApi.fetch(serviceRepo.mapping.page);
    };

    var safePage = function (resolve) {
        serviceRepo.fetchPage().then(function (response) {
            var page = angular.fromJson(response.body).payload.PageImpl;
            serviceRepo.empty();
            serviceRepo.addAll(page.content);
            if (table.getPageSettings().pageNumber > 1 && table.getPageSettings().pageNumber > page.totalPages) {
                table.setPage(page.totalPages);
                safePage(resolve);
            } else {
                resolve(page);
            }
        });
    };

    serviceRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = TableFactory.buildTable({
        pageNumber: sessionStorage.getItem('services-page') ? sessionStorage.getItem('services-page') : 1,
        pageSize: sessionStorage.getItem('services-size') ? sessionStorage.getItem('services-size') : 10,
        direction: 'DESC',
        properties: ['name'],
        filters: {},
        counts: [5, 10, 25, 50, 100],
        page: serviceRepo.page,
        data: serviceRepo.getContents(),
        name: 'services',
        repo: serviceRepo
    });

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
            service.getNotesTableParams().reload();
        }
    };

    serviceRepo.updateNote = function (note) {
        var service = getNotesService(note);
        for (var i in service.notes) {
            if (service.notes[i].id === note.id) {
                if (note.pinned || note.active) {
                    angular.extend(service.notes[i], note);
                    service.getNotesTableParams().reload();
                } else {
                    service.notes.splice(i, 1);
                    service.getNotesTableParams().reload();
                }
                return;
            }
        }
        if (note.pinned || note.active) {
            service.notes.push(note);
            service.getNotesTableParams().reload();
        }
    };

    serviceRepo.removeNoteById = function (id) {
        var services = serviceRepo.getAll();
        for (var i in services) {
            checkCreateNotes(services[i]);
            for (var j in services[i].notes) {
                if (services[i].notes[j].id === id) {
                    services[i].notes.splice(j, 1);
                    service[i].getNotesTableParams().reload();
                    return;
                }
            }
        }
    };


    var checkCreateIdeas = function (service) {
        if (service.ideas === undefined) {
            service.ideas = [];
        }
    };

    var getIdeasService = function (idea) {
        var service = serviceRepo.findById(idea.service.id);
        checkCreateIdeas(service);
        return service;
    };

    serviceRepo.addIdea = function (idea) {
        var service = getIdeasService(idea);
        service.ideas.push(idea);
        service.getIdeasTableParams().reload();
    };

    serviceRepo.updateIdea = function (idea) {
        var service = getIdeasService(idea);
        for (var i in service.ideas) {
            if (service.ideas[i].id === idea.id) {
                angular.extend(service.ideas[i], idea);
                service.getIdeasTableParams().reload();
                return;
            }
        }
        service.ideas.push(idea);
        service.getIdeasTableParams().reload();
    };

    serviceRepo.removeIdeaById = function (id) {
        var services = serviceRepo.getAll();
        for (var i in services) {
            checkCreateIdeas(services[i]);
            for (var j in services[i].ideas) {
                if (services[i].ideas[j].id === id) {
                    services[i].ideas.splice(j, 1);
                    service[i].getIdeasTableParams().reload();
                    return;
                }
            }
        }
    };


    var checkCreateFeatureProposals = function (service) {
        if (service.featureProposals === undefined) {
            service.featureProposals = [];
        }
    };

    var getFeatureProposalsService = function (featureProposal) {
        var service = serviceRepo.findById(featureProposal.service.id);
        checkCreateFeatureProposals(service);
        return service;
    };

    serviceRepo.addFeatureProposal = function (featureProposal) {
        var service = getFeatureProposalsService(featureProposal);
        service.featureProposals.push(featureProposal);
        service.getFeatureProposalsTableParams().reload();
    };

    serviceRepo.updateFeatureProposal = function (featureProposal) {
        var service = getFeatureProposalsService(featureProposal);
        for (var i in service.featureProposals) {
            if (service.featureProposals[i].id === featureProposal.id) {
                angular.extend(service.featureProposals[i], featureProposal);
                service.getFeatureProposalsTableParams().reload();
                return;
            }
        }
        service.featureProposals.push(featureProposal);
        service.getFeatureProposalsTableParams().reload();
    };

    serviceRepo.removeFeatureProposalById = function (id) {
        var services = serviceRepo.getAll();
        for (var i in services) {
            checkCreateFeatureProposals(services[i]);
            for (var j in services[i].featureProposals) {
                if (services[i].featureProposals[j].id === id) {
                    services[i].featureProposals.splice(j, 1);
                    services[i].getFeatureProposalsTableParams().reload();
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
            table.getTableParams().reload();
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