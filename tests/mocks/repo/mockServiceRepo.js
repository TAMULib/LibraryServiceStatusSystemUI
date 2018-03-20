angular.module('mock.serviceRepo', []).service('ServiceRepo', function ($q) {

  var ServiceRepo = this;

  ServiceRepo.create = function (service) {
    var defer = $q.defer();
    return defer.promise;
  };

  ServiceRepo.update = function (service) {
    var defer = $q.defer();
    return defer.promise;
  };

  ServiceRepo.getAll = function () {
    var defer = $q.defer();
    return defer.promise;
  };

  ServiceRepo.ready = function () {
    var defer = $q.defer();
    return defer.promise;
  };

});