describe('controller: ServiceController', function () {

  var scope, controller;

  beforeEach(module('core'));

  beforeEach(module('app'));

  beforeEach(module('mock.service'));

  beforeEach(module('mock.serviceRepo'));

  beforeEach(inject(function ($controller, $rootScope, _Service_, _ServiceRepo_) {
    installPromiseMatchers();
    scope = $rootScope.$new();
    controller = $controller('ServiceController', {
      $scope: scope,
      Service: _Service_,
      ServiceRepo: _ServiceRepo_
    });

  }));

  describe('Is the controller defined', function () {
    it('should be defined', function () {
      expect(controller).toBeDefined();
    });
  });

  describe('Are the scope methods defined', function () {
    it('createService should be defined', function () {
      expect(scope.createService).toBeDefined();
      expect(typeof scope.createService).toEqual("function");
    });
    it('updateService should be defined', function () {
      expect(scope.updateService).toBeDefined();
      expect(typeof scope.updateService).toEqual("function");
    });
  });

});