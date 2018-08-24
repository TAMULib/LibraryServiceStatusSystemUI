var mockNotes = [
  {
    "active": true,
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
    "body": "<p>This is <strong>Jack's</strong> note.</p>",
    "id": 123456789,
    "lastModified": 1529618244432,
    "noteType": "ENHANCEMENT",
    "pinned": false,
    "schedules": [],
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
    "title": "Jack's Note",
    "type": "note",
  },
  {
    "active": true,
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
    "body": "<p>This is <strong>Jill's</strong> note.</p>",
    "id": 987654321,
    "lastModified": 1234567890120,
    "noteType": "ISSUE",
    "pinned": true,
    "schedules": [],
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
    "type": "note",
    "withinSchedule": false
  },
  {
    "active": false,
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
    "body": "<p>This is <strong>Jacob's</strong> note.</p>",
    "id": 192837465,
    "lastModified": 1529679921989,
    "noteType": "REPORT",
    "pinned": false,
    "schedules": [],
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
    "title": "Jacob's Note",
    "type": "note",
    "withinSchedule": true
  }
];

angular.module('mock.noteRepo', []).service('NoteRepo', function ($q) {

    var noteRepo = this;
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

    var updateNote = function (note) {
        noteRepo.update(note);
    };

    var safePage = function(resolve) {
        // @todo
    };

    var table = {
        // @todo
    };

    noteRepo.list = mockNotes;

    noteRepo.create = function (note) {
        defer = $q.defer();
        note.id = noteRepo.list.length + 1;
        noteRepo.list.push(angular.copy(note));
        payloadResponse(note);
        return defer.promise;
    };

    noteRepo.update = function (note) {
        defer = $q.defer();
        for (var i in noteRepo.list) {
            if (noteRepo.list[i].id === note.id) {
                angular.extend(noteRepo.list[i], note);
                note = noteRepo.list[i];
                break;
            }
        }
        payloadResponse(note);
        return defer.promise;
    };

    noteRepo.getAll = function () {
        defer = $q.defer();
        payloadResponse(angular.copy(noteRepo.list));
        return defer.promise;
    };

    noteRepo.fetchById = function (id) {
        var found;
        for (var i in noteRepo.list) {
            if (noteRepo.list[i].id === id) {
                found = angular.copy(noteRepo.list[i]);
                break;
            }
        }
        return found;
    };

    noteRepo.getPageSettings = function () {
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

    noteRepo.getTableParams = function () {
        var table = {
            reload: function() {}
        }
        // @todo
        return table;
    };

    noteRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    noteRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    noteRepo.ready = function () {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    return noteRepo;
});
