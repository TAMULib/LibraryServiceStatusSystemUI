describe('controller: ServiceDetailController', function () {

    var scope, controller, Note, Service, ServiceRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.note');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($anchorScroll, $controller, $rootScope, $timeout, _Note_, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ServiceDetailController', {
                $anchorScroll: $anchorScroll,
                $routeParams: {
                    serviceId: 2
                },
                $scope: scope,
                $timeout: $timeout,
                Note: _Note_,
                Service: _Service_,
                ServiceRepo: _ServiceRepo_
            });

            Note = _Note_;
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
        it('setActiveTab should be defined', function () {
            expect(scope.setActiveTab).toBeDefined();
            expect(typeof scope.setActiveTab).toEqual("function");
        });
        it('getServiceWebsite should be defined', function () {
            expect(scope.getServiceWebsite).toBeDefined();
            expect(typeof scope.getServiceWebsite).toEqual("function");
        });
        it('hasNotes should be defined', function () {
            expect(scope.hasNotes).toBeDefined();
            expect(typeof scope.hasNotes).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('setActiveTab should assign the active tab', function () {
            var tab = "activeTabTest";
            scope.activeTab = "";
            scope.setActiveTab(tab);
            expect(scope.activeTab).toEqual(tab);
        });
        it('getServiceWebsite should return the service website', function () {
            var service = ServiceRepo.findById(1);
            expect(scope.getServiceWebsite(service)).toEqual(service.website);

            service.website = null;
            expect(scope.getServiceWebsite(service)).toEqual(service.website);
        });
        it('hasNotes should return the service website', function () {
            var result;
            var note1 = new Note();
            var note2 = new Note();
            note1.mock(mockNote1);
            note2.mock(mockNote2);

            result = scope.hasNotes();
            expect(result).toBe(false);

            scope.notesTableParams = {
                data: [note1, note2]
            };

            result = scope.hasNotes();
            expect(result).toBe(true);
        });
    });

});
