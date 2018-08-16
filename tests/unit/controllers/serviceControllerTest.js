describe('controller: ServiceController', function () {

    var scope, controller, ServiceRepo;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            ServiceRepo = _ServiceRepo_;
            controller = $controller('ServiceController', {
                $scope: scope,
                Service: _Service_,
                ServiceRepo: _ServiceRepo_
            });

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
            var newService = {
                "notes": [

                ],
                "schedules": [

                ],
                "withinSchedule": false,
                "name": "Test 4",
                "aliases": [

                ],
                "status": "MAINTENANCE",
                "isAuto": false,
                "isPublic": true,
                "onShortList": true,
                "serviceUrl": null,
                "description": "<p>Hello, Test 4!</p>",
                "projectId": null,
                "type": "service"
            };
            scope.serviceData = newService;
            scope.createService();
            newService.id = id;
            expect(ServiceRepo.findById(id)).toEqual(newService);
        });
        it('updateService should update a project', function () {
            var id = 1;
            var updatedService = {
                "notes": [

                ],
                "id": id,
                "schedules": [

                ],
                "withinSchedule": false,
                "name": "Test 1 Updated",
                "aliases": [

                ],
                "status": "MAINTENANCE",
                "isAuto": true,
                "isPublic": true,
                "onShortList": true,
                "serviceUrl": null,
                "description": "<p>Hello, Test 1 Update!</p>",
                "projectId": null,
                "type": "service"
            };
            scope.serviceData = updatedService;
            scope.updateService();
            expect(ServiceRepo.findById(id)).toEqual(updatedService);
        });
    });

});
