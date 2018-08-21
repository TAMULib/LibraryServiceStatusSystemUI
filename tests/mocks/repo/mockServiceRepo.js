var mockServices = [{
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
        "projectId": null,
        "type": "service",
        "website": "https://example.tamu.edu/"
    },
    {
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
        "projectId": null,
        "type": "service",
        "website": "http://example.tamu.edu/"
    },
    {
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
        "projectId": null,
        "type": "service",
        "website": null
    }
];

angular.module('mock.serviceRepo', []).service('ServiceRepo', function ($q) {

    var serviceRepo = this;

    serviceRepo.list = mockServices;

    serviceRepo.create = function (service) {
        var defer = $q.defer();
        service.id = serviceRepo.list.length + 1;
        serviceRepo.list.push(service);
        defer.resolve(service);
        return defer.promise;
    };

    serviceRepo.update = function (service) {
        var defer = $q.defer();
        for (var i in serviceRepo.list) {
            if (serviceRepo.list[i].id === service.id) {
                angular.extend(serviceRepo.list[i], service);
                service = serviceRepo.list[i];
                break;
            }
        }
        defer.resolve(service);
        return defer.promise;
    };

    serviceRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(serviceRepo.list);
        return defer.promise;
    };

    serviceRepo.findById = function (id) {
        var found;
        for (var i in serviceRepo.list) {
            if (serviceRepo.list[i].id === id) {
                found = angular.copy(serviceRepo.list[i]);
                break;
            }
        }
        return found;
    };

    serviceRepo.submitRequest = function (request) {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

    serviceRepo.ready = function () {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

    serviceRepo.reset = function () {};

    return serviceRepo;
});
