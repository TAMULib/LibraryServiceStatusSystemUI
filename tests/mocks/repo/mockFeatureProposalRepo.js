var mockFeatureProposals = [
    {
        "author": {
            "lastName": "Daniels",
            "firstName": "Jack",
            "id": 234567891,
            "usename": "4253938752821",
            "email": "aggieJack@library.tamu.edu",
            "role": "ROLE_ADMIN",
            "netId": "aggieJack",
            "notes": []
        },
        "description": "<p>This is <strong>Jack's</strong> feature Proposal.</p>",
        "feedback": "",
        "id": 123456789,
        "lastModified": 1529618244432,
        "service": {
          "id": 1,
          "schedules": [],
          "withinSchedule": false,
          "name": "Cap",
          "aliases": [],
          "status": "UP",
          "isAuto": false,
          "isPrivate": false,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "productId": 1,
          "type": "service"
        },
        "state": "IN_PROGRESS",
        "title": "Jack's FeatureProposal"
    },
    {
        "author": {
            "lastName": "Daniels",
            "firstName": "Jill",
            "id": 876543219,
            "usename": "1425393875282",
            "email": "aggieJill@library.tamu.edu",
            "role": "ROLE_USER",
            "netId": "aggieJill",
            "notes": []
        },
        "description": "<p>This is <strong>Jill's</strong> feature Proposal.</p>",
        "feedback": "",
        "id": 987654321,
        "lastModified": 1234567890120,
        "service": {
          "id": 1,
          "schedules": [],
          "withinSchedule": false,
          "name": "Cap",
          "aliases": [],
          "status": "UP",
          "isAuto": false,
          "isPrivate": false,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "productId": 1,
          "type": "service"
        },
        "state": "SUBMITTED",
        "title": "Jill's Note",
    },
    {
        "author": {
            "lastName": "Smith",
            "firstName": "Jacob",
            "id": 928374651,
            "usename": "8214253938752",
            "email": "jsmith@library.tamu.edu",
            "role": "ROLE_USER",
            "netId": "jsmith",
            "notes": []
        },
        "description": "<p>This is <strong>Jacob's</strong> feature Proposal.</p>",
        "feedback": "Unacceptable.",
        "id": 192837465,
        "lastModified": 1529679921989,
        "service": {
          "id": 1,
          "schedules": [],
          "withinSchedule": false,
          "name": "Cap",
          "aliases": [],
          "status": "UP",
          "isAuto": false,
          "isPrivate": false,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "productId": 1,
          "type": "service"
        },
        "state": "REJECTED",
        "title": "Jacob's FeatureProposal"
    }
];

angular.module('mock.featureProposalRepo', []).service('FeatureProposalRepo', function ($q) {

    var featureProposalRepo = this;
    var defer;

    var payloadResponse = function (payload) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS'
                },
                payload: payload
            })
        });
    };

    var messageResponse = function (message) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS',
                    message: message
                }
            })
        });
    };

    var table = {
        // @todo
    };

    var safePage = function(resolve) {
        // @todo
    };

    featureProposalRepo.list = mockFeatureProposals;

    featureProposalRepo.create = function (fp) {
        defer = $q.defer();
        fp.id = featureProposalRepo.list.length + 1;
        featureProposalRepo.list.push(angular.copy(fp));
        payloadResponse(fp);
        return defer.promise;
    };

    featureProposalRepo.update = function (fp) {
        defer = $q.defer();
        var featureProposal;
        for (var i in featureProposalRepo.list) {
            if (featureProposalRepo.list[i].id === fp.id) {
                angular.extend(featureProposalRepo.list[i], fp);
                featureProposal = angular.copy(featureProposalRepo.list[i]);
                break;
            }
        }
        payloadResponse(featureProposal);
        return defer.promise;
    };

    var updateNote = function (note) {
        featureProposalRepo.update(note);
    };

    featureProposalRepo.getAll = function () {
        defer = $q.defer();
        payloadResponse(angular.copy(featureProposalRepo.list));
        return defer.promise;
    };

    featureProposalRepo.fetchById = function (id) {
        var found;
        for (var i in featureProposalRepo.list) {
            if (featureProposalRepo.list[i].id === id) {
                found = angular.copy(featureProposalRepo.list[i]);
                break;
            }
        }
        return found;
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
        var table = {
            data: [],
            reload: function() {}
        }
        // @todo
        return table;
    };

    featureProposalRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    featureProposalRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    featureProposalRepo.reject = function (fp) {
        defer = $q.defer();
        var featureProposal = {};
        for (var i in featureProposalRepo.list) {
            if (featureProposalRepo.list[i].id === fp.id) {
                featureProposalRepo.list[i].state = "REJECTED";
                featureProposalRepo.list[i].feedback = fp.feedback;
                featureProposal = angular.copy(featureProposalRepo.list[i]);
                break;
            }
        }
        payloadResponse(featureProposal);
        return defer.promise;
    };

    featureProposalRepo.elevate = function (fp) {
        var i = featureProposalRepo.list.length;
        defer = $q.defer();
        featureProposalRepo.list[i] = angular.copy(fp);
        featureProposalRepo.list[i].state = "IN_PROGRESS";
        payloadResponse(angular.copy(featureProposalRepo.list[i]));
        return defer.promise;
    };

    featureProposalRepo.ready = function () {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    return featureProposalRepo;
});
