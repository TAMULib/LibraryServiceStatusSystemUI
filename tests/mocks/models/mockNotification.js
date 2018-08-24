var mockNotification1 = {
    "id": 123456789
};

var mockNotification2 = {
    "id": 987654321
};

var mockNotification3 = {
    "id": 192837465
};

angular.module('mock.notification', []).service('Notification', function ($q) {
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
            this.id = toMock.id;
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

        this.clearValidationResults = function () {

        };

        return this;
    };
});
