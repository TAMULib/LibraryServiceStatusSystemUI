var mockService = function () {
    this.isDirty = false;

    this.mock = function(toMock) {
    };

    this.save = function() {
    };

    this.dirty = function(boolean) {
        this.isDirty = boolean;
    };

    this.refresh = function() {
    };

    return this;
};

angular.module('mock.service', []).service('Service', function () {
    return mockService;
});
