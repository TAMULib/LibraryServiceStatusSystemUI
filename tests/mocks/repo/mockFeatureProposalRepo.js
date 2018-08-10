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
          "isPublic": true,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "projectId": 1,
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
          "isPublic": true,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "projectId": 1,
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
          "isPublic": true,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "projectId": 1,
          "type": "service"
        },
        "state": "REJECTED",
        "title": "Jacob's FeatureProposal"
    }
];

angular.module('mock.featureProposalRepo', []).service('FeatureProposalRepo', function ($q) {

    var FeatureProposalRepo = this;

    FeatureProposalRepo.list = mockFeatureProposals;

    FeatureProposalRepo.create = function (note) {
        var defer = $q.defer();
        note.id = FeatureProposalRepo.list.length + 1;
        FeatureProposalRepo.list.push(note);
        defer.resolve(note);
        return defer.promise;
    };

    FeatureProposalRepo.update = function (note) {
        var defer = $q.defer();
        for (var i in FeatureProposalRepo.list) {
            if (FeatureProposalRepo.list[i].id === note.id) {
                angular.extend(FeatureProposalRepo.list[i], note);
                note = FeatureProposalRepo.list[i];
                break;
            }
        }
        defer.resolve(note);
        return defer.promise;
    };

    var updateNote = function (note) {
        FeatureProposalRepo.update(note);
    };

    FeatureProposalRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(FeatureProposalRepo.list);
        return defer.promise;
    };

    FeatureProposalRepo.fetchById = function (noteId) {
        var note = new Note();
        for (var i in FeatureProposalRepo.list) {
            if (FeatureProposalRepo.list[i].id === id) {
                note = FeatureProposalRepo.list[i];
                break;
            }
        }
        return note;
    };

    FeatureProposalRepo.getPageSettings = function () {
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

    FeatureProposalRepo.getTableParams = function () {
        // @todo
        return {};
    };

    FeatureProposalRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    var safePage = function(resolve) {
        // @todo
    };

    FeatureProposalRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = {
        // @todo
    };
});
