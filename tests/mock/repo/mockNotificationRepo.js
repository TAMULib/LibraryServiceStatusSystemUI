var mockNotifications = [
    {
        "id": 123456789
    },
    {
        "id": 987654321
    },
    {
        "id": 192837465
    }
];

angular.module('mock.notificationRepo', []).service('NotificationRepo', function ($q) {

    var notificationRepo = this;
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

    var updateNote = function (notification) {
        notificationRepo.update(notification);
    };

    var safePage = function(resolve) {
        // @todo
    };

    var table = {
        // @todo
    };

    notificationRepo.list = mockNotifications;

    notificationRepo.create = function (notification) {
        defer = $q.defer();
        notification.id = notificationRepo.list.length + 1;
        notificationRepo.list.push(angular.copy(notification));
        payloadResponse(notification);
        return defer.promise;
    };

    notificationRepo.update = function (notification) {
        defer = $q.defer();
        for (var i in notificationRepo.list) {
            if (notificationRepo.list[i].id === notification.id) {
                angular.extend(notificationRepo.list[i], notification);
                notification = notificationRepo.list[i];
                break;
            }
        }
        payloadResponse(notification);
        return defer.promise;
    };

    notificationRepo.getAll = function () {
        defer = $q.defer();
        payloadResponse(angular.copy(notificationRepo.list));
        return defer.promise;
    };

    notificationRepo.fetchById = function (id) {
        var found;
        for (var i in notificationRepo.list) {
            if (notificationRepo.list[i].id === id) {
                found = angular.copy(notificationRepo.list[i]);
                break;
            }
        }
        return found;
    };

    notificationRepo.getPageSettings = function () {
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

    notificationRepo.getTableParams = function () {
        var table = {
            reload: function() {}
        }
        // @todo
        return table;
    };

    notificationRepo.fetchPage = function (pageSettings) {
        // @todo
        return {};
    };

    notificationRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    notificationRepo.ready = function () {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    return notificationRepo;
});
