describe('controller: NavigationController', function () {

    var controller, scope, window;

    beforeEach(function() {
        module('core');
        module('app');

        inject(function ($controller, $rootScope, $location, $window) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            window = $window;
            controller = $controller('NavigationController', {
                $scope: scope,
                $location: $location,
                $window: $window
            });
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('updateWidth should be defined', function () {
            expect(scope.updateWidth).toBeDefined();
            expect(typeof scope.updateWidth).toEqual("function");
        });
        it('updateHeight should be defined', function () {
            expect(scope.updateHeight).toBeDefined();
            expect(typeof scope.updateHeight).toEqual("function");
        });
    });

    describe('Are the window methods defined', function () {
        it('onresize should be defined', function () {
            expect(window.onresize).toBeDefined();
            expect(typeof window.onresize).toEqual("function");
        });
    });

});
