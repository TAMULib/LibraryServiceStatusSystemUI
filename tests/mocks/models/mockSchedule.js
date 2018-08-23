var mockSchedule1 = {
    "editing": false,
    "id": 123456789,
    "previousStatus": null,
    "status": null
};

var mockSchedule2 = {
    "editing": false,
    "id": 987654321,
    "previousStatus": null,
    "status": null
};

var mockSchedule3 = {
    "editing": false,
    "id": 192837465,
    "previousStatus": null,
    "status": null
};

angular.module('mock.schedule', []).service('Schedule', function ($q) {
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
            this.editing = toMock.editing;
            this.id = toMock.id;
            this.previousStatus = toMock.previousStatus;
            this.status = toMock.status;
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
