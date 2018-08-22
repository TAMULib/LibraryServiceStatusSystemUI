var mockNote1 = {
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
};

var mockNote2 = {
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
};

var mockNote3 = {
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
};

angular.module('mock.note', []).service('Note', function ($q) {
    return function () {
        this.isDirty = false;

        this.mock = function(toMock) {
            this.active = toMock.active;
            this.author = toMock.author;
            this.body = toMock.body;
            this.id = toMock.id;
            this.lastModified = toMock.lastModified;
            this.noteType = toMock.noteType;
            this.pinned = toMock.pinned;
            this.schedules = toMock.schedules;
            this.service = toMock.service;
            this.title = toMock.title;
            this.type = toMock.type;
            this.withinSchedule = toMock.withinSchedule;
        };

        this.save = function() {
        };

        this.dirty = function(boolean) {
            this.isDirty = boolean;
        };

        this.refresh = function() {
        };

        this.clearValidationResults = function () {

        };

        return this;
    };
});
