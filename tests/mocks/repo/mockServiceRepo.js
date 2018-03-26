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
        "type": "service"
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
        "type": "service"
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
        "type": "service"
    }
];

angular.module('mock.serviceRepo', []).service('ServiceRepo', function ($q) {

    var ServiceRepo = this;

    ServiceRepo.list = mockServices;

    ServiceRepo.create = function (service) {
        var defer = $q.defer();
        service.id = ServiceRepo.list.length + 1;
        ServiceRepo.list.push(service);
        defer.resolve(service);
        return defer.promise;
    };

    ServiceRepo.update = function (service) {
        var defer = $q.defer();
        for (var i in ServiceRepo.list) {
            if (ServiceRepo.list[i].id === service.id) {
                angular.extend(ServiceRepo.list[i], service);
                service = ServiceRepo.list[i];
                break;
            }
        }
        defer.resolve(service);
        return defer.promise;
    };

    ServiceRepo.getAll = function () {
        var defer = $q.defer();
        defer.resolve(ServiceRepo.list);
        return defer.promise;
    };

    ServiceRepo.findById = function (id) {
        for (var i in ServiceRepo.list) {
            if (ServiceRepo.list[i].id === id) {
                return ServiceRepo.list[i];
            }
        }
    };

    ServiceRepo.submitRequest = function (request) {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

    ServiceRepo.ready = function () {
        var defer = $q.defer();
        defer.resolve();
        return defer.promise;
    };

});