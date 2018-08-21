var mockIdea1 = {
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
};

var mockIdea2 = {
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
    "title": "Jill's Note"
};

var mockIdea3 = {
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
};

angular.module('mock.idea', []).service('Idea', function ($q) {
    return function () {
        return this;
    };
});
