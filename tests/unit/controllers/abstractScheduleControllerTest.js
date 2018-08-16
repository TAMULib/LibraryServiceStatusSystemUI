describe('controller: AbstractScheduleController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');

        inject(function ($controller, $rootScope) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('AbstractScheduleController', {
                $scope: scope
            });
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('reset should be defined', function () {
            expect(scope.reset).toBeDefined();
            expect(typeof scope.reset).toEqual("function");
        });
        it('cancel should be defined', function () {
            expect(scope.cancel).toBeDefined();
            expect(typeof scope.cancel).toEqual("function");
        });
        it('isValid should be defined', function () {
            expect(scope.isValid).toBeDefined();
            expect(typeof scope.isValid).toEqual("function");
        });
        it('saveSchedule should be defined', function () {
            expect(scope.saveSchedule).toBeDefined();
            expect(typeof scope.saveSchedule).toEqual("function");
        });
    });

});
