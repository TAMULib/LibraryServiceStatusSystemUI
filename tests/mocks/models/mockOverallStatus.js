var mockOverallStatus = function () {
    return this;
};

angular.module('mock.overallStatusPublic', []).service('OverallStatusPublic', function () {
    return mockOverallStatus;
});

angular.module('mock.overallStatusFull', []).service('OverallStatusFull', function () {
    return mockOverallStatus;
});
