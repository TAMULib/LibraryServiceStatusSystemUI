var mockFeatureProposal1 = {
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
    "ideas": [],
    "lastModified": 1529618244432,
    "removedIdeas": [],
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
};

var mockFeatureProposal2 = {
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
    "ideas": [],
    "lastModified": 1234567890120,
    "removedIdeas": [],
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
    "title": "Jill's Note"
};

var mockFeatureProposal3 = {
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
    "ideas": [],
    "lastModified": 1529679921989,
    "removedIdeas": [],
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
};

angular.module('mock.featureProposal', []).service('FeatureProposal', function ($q) {
    return function () {
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

        this.isDirty = false;

        this.mock = function(toMock) {
            this.author = toMock.author;
            this.description = toMock.description;
            this.feedback = toMock.feedback;
            this.id = toMock.id;
            this.ideas = toMock.ideas;
            this.lastModified = toMock.lastModified;
            this.removedIdeas = toMock.removedIdeas;
            this.service = toMock.service;
            this.state = toMock.state;
            this.title = toMock.title;
        };

        this.save = function() {
        };

        this.delete = function() {
            defer = $q.defer();
            payloadResponse();
            return defer.promise;
        };

        this.dirty = function(boolean) {
            this.isDirty = boolean;
        };

        this.refresh = function() {
        };

        this.clearValidationResults = function() {
        };

        return this;
    };
});
