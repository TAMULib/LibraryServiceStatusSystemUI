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

    var IdeaRepo = this;

    IdeaRepo.list = mockIdeas;

    IdeaRepo.create = function (note) {
        var defer = $q.defer();
        note.id = IdeaRepo.list.length + 1;
        IdeaRepo.list.push(note);
        defer.resolve(note);
        return defer.promise;
    };

    IdeaRepo.update = function (note) {
        var defer = $q.defer();
        for (var i in IdeaRepo.list) {
            if (IdeaRepo.list[i].id === note.id) {
                angular.extend(IdeaRepo.list[i], note);
                note = IdeaRepo.list[i];
                break;
            }
        }
        defer.resolve(note);
        return defer.promise;
    };

    var updateNote = function (note) {
        IdeaRepo.update(note);
    };

    IdeaRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(IdeaRepo.list);
        return defer.promise;
    };

    IdeaRepo.fetchById = function (id) {
        var found;
        for (var i in IdeaRepo.list) {
            if (IdeaRepo.list[i].id === id) {
                found = angular.copy(IdeaRepo.list[i]);
                break;
            }
        }
        return found;
    };

    IdeaRepo.getPageSettings = function () {
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

    IdeaRepo.getTableParams = function () {
        // @todo
        return {};
    };

    IdeaRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    var safePage = function(resolve) {
        // @todo
    };

    IdeaRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = {
        // @todo
    };

});
