describe('controller: ServiceController', function () {

    var scope, controller, Service, ServiceRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ServiceController', {
                $scope: scope,
                Service: _Service_,
                ServiceRepo: _ServiceRepo_
            });

            Service = _Service_;
            ServiceRepo = _ServiceRepo_;

            // ensure that the isReady() is called.
            //scope.$digest();
        });
    });

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

    describe('Do the scope methods work as expected', function () {
        it('createService should created a new project', function () {
            var id = mockServices.length + 1;
            var newService = new Service();
            newService.name = "Test 4";
            newService.status = "MAINTENANCE";
            newService.description = "<p>Hello, Test 4!</p>";

            scope.serviceData = newService;
            scope.createService();
            newService.id = id;
            expect(ServiceRepo.findById(id)).toEqual(newService);
        });
        it('updateService should update a project', function () {
            var id = 1;
            var updatedService = ServiceRepo.findById(id);
            updatedService.description = "<p>Hello, Test 1 Update!</p>";

            scope.serviceData = updatedService;
            scope.updateService();
            expect(ServiceRepo.findById(id)).toEqual(updatedService);
        });
    });

});
