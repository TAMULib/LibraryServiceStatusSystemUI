var mockOverallStatus = function () {
    this.isDirty = false;

    this.mock = function(toMock) {
    };

    this.save = function() {
    };

    this.delete = function() {
    };

    this.dirty = function(boolean) {
        this.isDirty = boolean;
    };

    this.reload = function() {
    };

    return this;
};

angular.module('mock.overallStatusPublic', []).service('OverallStatusPublic', function () {
    return mockOverallStatus;
});

angular.module('mock.overallStatusFull', []).service('OverallStatusFull', function () {
    return mockOverallStatus;
});
