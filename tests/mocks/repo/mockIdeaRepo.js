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
        "elevated": false,
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
        "elevated": false,
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
        "elevated": false,
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
        "title": "Jacob's Idea"
    }
];

angular.module('mock.ideaRepo', []).service('IdeaRepo', function ($q) {

    var ideaRepo = this;

    ideaRepo.list = mockIdeas;

    ideaRepo.create = function (idea) {
        var defer = $q.defer();
        idea.id = ideaRepo.list.length + 1;
        ideaRepo.list.push(angular.copy(idea));
        defer.resolve(idea);
        return defer.promise;
    };

    ideaRepo.update = function (idea) {
        var defer = $q.defer();
        for (var i in ideaRepo.list) {
            if (ideaRepo.list[i].id === idea.id) {
                angular.extend(ideaRepo.list[i], idea);
                idea = ideaRepo.list[i];
                break;
            }
        }
        defer.resolve(idea);
        return defer.promise;
    };

    var updateNote = function (idea) {
        ideaRepo.update(idea);
    };

    ideaRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(angular.copy(ideaRepo.list));
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

    var safePage = function(resolve) {
        // @todo
    };

    ideaRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = {
        // @todo
    };

    ideaRepo.ready = function () {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

    return ideaRepo;
});
