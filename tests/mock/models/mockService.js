var mockService1 = {
    "notes": [
    ],
    "id": 1,
    "schedules": [
    ],
    "withinSchedule": false,
    "name": "Test 1",
    "aliases": [
    ],
    "status": "UP",
    "isAuto": false,
    "isPublic": true,
    "onShortList": false,
    "serviceUrl": null,
    "description": "<p>Hello, Test 1!</p>",
    "productId": null,
    "type": "service",
    "website": "https://example.tamu.edu/"
};

var mockService2 = {
    "notes": [
    ],
    "id": 2,
    "schedules": [
    ],
    "withinSchedule": false,
    "name": "Test 2",
    "aliases": [
    ],
    "status": "MAINTENANCE",
    "isAuto": false,
    "isPublic": true,
    "onShortList": true,
    "serviceUrl": null,
    "description": "<p>Hello, Test 2!</p>",
    "productId": null,
    "type": "service",
    "website": "http://example.tamu.edu/"
};

var mockService3 = {
    "notes": [
    ],
    "id": 3,
    "schedules": [
    ],
    "withinSchedule": false,
    "name": "Test 3",
    "aliases": [
    ],
    "status": "UP",
    "isAuto": false,
    "isPublic": true,
    "onShortList": true,
    "serviceUrl": null,
    "description": "<p>Hello, Test 3!</p>",
    "productId": 1,
    "type": "service",
    "website": null
};

angular.module('mock.service', []).service('Service', function ($q) {
    return function () {
        this.isDirty = false;

        this.mock = function(toMock) {
            this.notes = toMock.notes;
            this.id = toMock.id;
            this.schedules = toMock.schedules;
            this.withinSchedule = toMock.withinSchedule;
            this.name = toMock.name;
            this.aliases = toMock.aliases;
            this.status = toMock.status;
            this.isAuto = toMock.isAuto;
            this.isPublic = toMock.isPublic;
            this.onShortList = toMock.onShortList;
            this.serviceUrl = toMock.serviceUrl;
            this.description = toMock.description;
            this.productId = toMock.productId;
            this.type = toMock.type;
            this.website = toMock.website;
        };

        this.save = function() {
        };

        this.delete = function() {
        };

        this.dirty = function(boolean) {
            this.isDirty = boolean;
        };

        this.refresh = function() {
        };

        this.clearValidationResults = function() {
        };

        this.getNotesTableParams = function() {
            var table = {
                data: [],
                reload: function() {}
            }
            // @todo
            return table;
        };

        this.getFeatureProposalsTableParams = function() {
            var table = {
                data: [],
                reload: function() {}
            }
            // @todo
            return table;
        };

        this.getManagedFeatureProposalsTableParams = function() {
            var table = {
                data: [],
                reload: function() {}
            }
            // @todo
            return table;
        };

        this.getManagedFeatureProposalsPageSettings = function() {
            return {};
        };

        return this;
    };
});
