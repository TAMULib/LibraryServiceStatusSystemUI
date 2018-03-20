var mockService = function () {
  return this;
};

angular.module('mock.service', []).service('Service', function () {
  return mockService;
});