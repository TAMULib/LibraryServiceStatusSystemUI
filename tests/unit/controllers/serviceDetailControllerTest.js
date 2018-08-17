describe('controller: ServiceDetailController', function () {

    var scope, controller, ServiceRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, $anchorScroll, $timeout, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            ServiceRepo = _ServiceRepo_;
            controller = $controller('ServiceDetailController', {
                $scope: scope,
                $anchorScroll: $anchorScroll,
                $routeParams: {},
                $timeout: $timeout,
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
        it('setActiveTab should be defined', function () {
            expect(scope.setActiveTab).toBeDefined();
            expect(typeof scope.setActiveTab).toEqual("function");
        });
        it('getServiceWebsite should be defined', function () {
            expect(scope.getServiceWebsite).toBeDefined();
            expect(typeof scope.getServiceWebsite).toEqual("function");
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
    });

});
