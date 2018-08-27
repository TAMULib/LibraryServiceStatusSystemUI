var mockIdeas = [
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
        "description": "<p>This is <strong>Jack's</strong> idea.</p>",
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
          "isPublic": true,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "projectId": 1,
          "type": "service"
        },
        "state": "WAITING_ON_REVIEW",
        "title": "Jack's Idea"
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
        "description": "<p>This is <strong>Jill's</strong> idea.</p>",
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
          "isPublic": true,
          "onShortList": true,
          "serviceUrl": null,
          "description": "Repository agnostic curation",
          "website": "cap.library.tamu.edu",
          "software": "Tomcat",
          "projectId": 1,
          "type": "service"
        },
        "state": "WAITING_ON_REVIEW",
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
        "description": "<p>This is <strong>Jacob's</strong> idea.</p>",
        "feedback": "",
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
        "state": "WAITING_ON_REVIEW",
        "title": "Jacob's Idea"
    }
];

angular.module('mock.ideaRepo', []).service('IdeaRepo', function ($q) {

    var ideaRepo = this;
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

    var updateNote = function (idea) {
        ideaRepo.update(idea);
    };

    var safePage = function(resolve) {
        // @todo
    };

    var table = {
        // @todo
    };

    ideaRepo.list = mockIdeas;

    ideaRepo.create = function (idea) {
        defer = $q.defer();
        idea.id = ideaRepo.list.length + 1;
        ideaRepo.list.push(angular.copy(idea));
        payloadResponse(idea);
        return defer.promise;
    };

    ideaRepo.update = function (idea) {
        defer = $q.defer();
        for (var i in ideaRepo.list) {
            if (ideaRepo.list[i].id === idea.id) {
                angular.extend(ideaRepo.list[i], idea);
                idea = ideaRepo.list[i];
                break;
            }
        }
        payloadResponse(idea);
        return defer.promise;
    };

    ideaRepo.getAll = function () {
        defer = $q.defer();
        payloadResponse(angular.copy(ideaRepo.list));
        return defer.promise;
    };

    ideaRepo.fetchById = function (id) {
        var found;
        for (var i in ideaRepo.list) {
            if (ideaRepo.list[i].id === id) {
                found = angular.copy(ideaRepo.list[i]);
                break;
            }
        }
        return found;
    };

    ideaRepo.getPageSettings = function () {
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

    ideaRepo.getTableParams = function () {
        var table = {
            reload: function() {}
        }
        // @todo
        return table;
    };

    ideaRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    ideaRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    ideaRepo.reject = function (idea) {
        defer = $q.defer();
        var updatedIdea = {};
        for (var i in ideaRepo.list) {
            if (ideaRepo.list[i].id === idea.id) {
                ideaRepo.list[i].state = "REJECTED";
                ideaRepo.list[i].feedback = idea.feedback;
                updatedIdea = angular.copy(ideaRepo.list[i]);
                break;
            }
        }
        payloadResponse(updatedIdea);
        return defer.promise;
    };

    ideaRepo.sendToHelpdesk = function (idea) {
        defer = $q.defer();
        var updatedIdea = {};
        for (var i in ideaRepo.list) {
            if (ideaRepo.list[i].id === idea.id) {
                ideaRepo.list[i].state = "ELEVATED";
                updatedIdea = angular.copy(ideaRepo.list[i]);
                break;
            }
        }
        payloadResponse(updatedIdea);
        return defer.promise;
    };

    ideaRepo.ready = function () {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    return ideaRepo;
});
