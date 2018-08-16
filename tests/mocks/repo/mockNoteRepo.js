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
    var NoteRepo = this;

    NoteRepo.list = mockNotes;

    NoteRepo.create = function (note) {
        var defer = $q.defer();
        note.id = NoteRepo.list.length + 1;
        NoteRepo.list.push(note);
        defer.resolve(note);
        return defer.promise;
    };

    NoteRepo.update = function (note) {
        var defer = $q.defer();
        for (var i in NoteRepo.list) {
            if (NoteRepo.list[i].id === note.id) {
                angular.extend(NoteRepo.list[i], note);
                note = NoteRepo.list[i];
                break;
            }
        }
        defer.resolve(note);
        return defer.promise;
    };

    var updateNote = function (note) {
        NoteRepo.update(note);
    };

    NoteRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(NoteRepo.list);
        return defer.promise;
    };

    NoteRepo.fetchById = function (id) {
        var found;
        for (var i in NoteRepo.list) {
            if (NoteRepo.list[i].id === id) {
                found = angular.copy(NoteRepo.list[i]);
                break;
            }
        }
        return found;
    };

    NoteRepo.getPageSettings = function () {
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

    NoteRepo.getTableParams = function () {
        // @todo
        return {};
    };

    NoteRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    var safePage = function(resolve) {
        // @todo
    };

    NoteRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = {
        // @todo
    };

    return NoteRepo;
});
