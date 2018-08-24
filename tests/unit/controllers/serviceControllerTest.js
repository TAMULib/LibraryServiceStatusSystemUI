describe('controller: ServiceController', function () {

    var scope, q, controller, Projects, ProjectService, Service, ServiceRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.projects');
        module('mock.projectService');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($controller, $q, $rootScope, _Projects_, _ProjectService_, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            controller = $controller('ServiceController', {
                $scope: scope,
                Projects: _Projects_,
                ProjectService: _ProjectService_,
                Service: _Service_,
                ServiceRepo: _ServiceRepo_
            });

            Projects = _Projects_;
            ProjectService = _ProjectService_;
            Service = _Service_;
            ServiceRepo = _ServiceRepo_;

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('resetServices should be defined', function () {
            expect(scope.resetServices).toBeDefined();
            expect(typeof scope.resetServices).toEqual("function");
        });
        it('createService should be defined', function () {
            expect(scope.createService).toBeDefined();
            expect(typeof scope.createService).toEqual("function");
        });
        it('editService should be defined', function () {
            expect(scope.editService).toBeDefined();
            expect(typeof scope.editService).toEqual("function");
        });
        it('updateService should be defined', function () {
            expect(scope.updateService).toBeDefined();
            expect(typeof scope.updateService).toEqual("function");
        });
        it('editSchedule should be defined', function () {
            expect(scope.editSchedule).toBeDefined();
            expect(typeof scope.editSchedule).toEqual("function");
        });
        it('resetSchedule should be defined', function () {
            expect(scope.resetSchedule).toBeDefined();
            expect(typeof scope.resetSchedule).toEqual("function");
        });
        it('confirmDelete should be defined', function () {
            expect(scope.confirmDelete).toBeDefined();
            expect(typeof scope.confirmDelete).toEqual("function");
        });
        it('deleteService should be defined', function () {
            expect(scope.deleteService).toBeDefined();
            expect(typeof scope.deleteService).toEqual("function");
        });
        it('getProject should be defined', function () {
            expect(scope.getProject).toBeDefined();
            expect(typeof scope.getProject).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('resetServices should reset services', function () {
            var service;
            scope.serviceData = null;
            scope.closeModal = function() {};

            spyOn(scope, 'closeModal');

            scope.resetServices();

            expect(scope.closeModal).toHaveBeenCalled();
            expect(scope.serviceData).not.toEqual(null);

            // service data now has an object and can be tested.
            // save the service because scope.serviceData is overwritten, which would break any spy.
            service = scope.serviceData;
            spyOn(service, 'refresh');
            spyOn(service, 'clearValidationResults');

            scope.resetServices();

            expect(service.refresh).toHaveBeenCalled();
            expect(service.clearValidationResults).toHaveBeenCalled();
        });
        it('createService should created a new service', function () {
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
        it('editService should open a modal', function () {
            scope.serviceData = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editService(mockService1);

            expect(scope.serviceData).toEqual(mockService1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('updateService should update a service', function () {
            var id = 1;
            var updatedService = ServiceRepo.findById(id);
            updatedService.description = "<p>Hello, Test 1 Update!</p>";

            scope.serviceData = updatedService;
            scope.updateService();
            expect(ServiceRepo.findById(id)).toEqual(updatedService);
        });
        it('confirmDelete should should open a modal', function () {
            scope.serviceToDelete = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmDelete(mockService1);

            expect(scope.serviceToDelete).toEqual(mockService1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('deleteService should delete a service', function () {
            scope.deleting = null;
            scope.serviceToDelete = new Service();
            scope.serviceToDelete.mock(mockService1);

            var deferred = q.defer();
            spyOn(scope.serviceToDelete, 'delete').and.returnValue(deferred.promise);
            scope.deleteService();
            deferred.resolve();

            // todo: more work needs to be done, this should be testig for deleting toBe(false).
            expect(scope.deleting).toBeTruthy();
            expect(scope.serviceToDelete.delete).toHaveBeenCalled();
        });
        it('editSchedule should open a modal', function () {
            scope.data = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editSchedule(mockService1);

            expect(scope.data).toEqual(mockService1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('resetSchedule should reset services', function () {
            spyOn(scope, 'resetServices');

            scope.resetSchedule();

            expect(scope.resetServices).toHaveBeenCalled();
        });
        /* todo: ProjectService/Project needs proper mocks and so on.
        it('getProject should reset services', function () {
            var service = new Service();
            var project = new ProjectService();
            service.mock(mockService3);
            project(mockProjectservice1);

            spyOn(ProjectService, 'getById');

            // todo: more work needed.
            scope.getProject(service);

            expect(ProjectService.getById).toHaveBeenCalled();
        });
        */
    });

});
