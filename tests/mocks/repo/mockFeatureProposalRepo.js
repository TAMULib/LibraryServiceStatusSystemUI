var mockFeatureProposalRepos = [

];

angular.module('mock.featureProposalRepo', []).service('FeatureProposalRepo', function ($q) {
    var featureProposalRepo = this;

    featureProposalRepo.list = mockFeatureProposalRepos;

    featureProposalRepo.create = function (note) {
        var defer = $q.defer();
        note.id = featureProposalRepo.list.length + 1;
        featureProposalRepo.list.push(note);
        defer.resolve(note);
        return defer.promise;
    };

    featureProposalRepo.update = function (note) {
        var defer = $q.defer();
        for (var i in featureProposalRepo.list) {
            if (featureProposalRepo.list[i].id === note.id) {
                angular.extend(featureProposalRepo.list[i], note);
                note = featureProposalRepo.list[i];
                break;
            }
        }
        defer.resolve(note);
        return defer.promise;
    };

    var updateFeatureProposal = function (note) {
        featureProposalRepo.update(note);
    };

    featureProposalRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(featureProposalRepo.list);
        return defer.promise;
    };

    featureProposalRepo.fetchById = function (noteId) {
        var note = new Note();
        for (var i in featureProposalRepo.list) {
            if (featureProposalRepo.list[i].id === id) {
                note = featureProposalRepo.list[i];
                break;
            }
        }
        return note;
    };

    featureProposalRepo.getPageSettings = function () {
        var mockPageSettings = {
            filters: {
                active: [true]
            },
            sort: [{
                property: 'service.name',
                direction: 'ASC'
            }, {
                property: 'lastModified',
                direction: 'DESC'
            }]
        };

        return mockPageSettings;
    };

    featureProposalRepo.getTableParams = function () {
        // @todo
        return {};
    };

    featureProposalRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    var safePage = function (resolve) {
        // @todo
    };

    featureProposalRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = {
        // @todo
    };

    return featureProposalRepo;
});