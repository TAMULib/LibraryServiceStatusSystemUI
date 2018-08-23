describe('controller: NavigationController', function () {

    var controller, scope, window;

    beforeEach(function() {
        module('core');
        module('app');

        inject(function ($controller, $location, $rootScope, $window) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            window = $window;

            controller = $controller('NavigationController', {
                $scope: scope,
                $location: $location,
                $window: window
            });

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
        it('updateWidth should be defined', function () {
            expect(scope.updateWidth).toBeDefined();
            expect(typeof scope.updateWidth).toEqual("function");
        });
        it('updateHeight should be defined', function () {
            expect(scope.updateHeight).toBeDefined();
            expect(typeof scope.updateHeight).toEqual("function");
        });
    });

    describe('Are the scope methods working as expected', function () {
        it('updateWidth should update the width', function () {
            var newWidth = 10;
            scope.windowWidth = 0;
            window.innerWidth = newWidth;

            scope.updateWidth();

            expect(scope.windowWidth).toBe(newWidth);
        });
        it('updateHeight should update the height', function () {
            var newHeight = 10;
            scope.windowHeight = 0;
            window.innerHeight = newHeight;

            scope.updateHeight();

            expect(scope.windowHeight).toBe(newHeight);
        });
    });

    describe('Are the window methods defined', function () {
        it('onresize should be defined', function () {
            expect(window.onresize).toBeDefined();
            expect(typeof window.onresize).toEqual("function");
        });
    });

    describe('Are the window methods working as expected', function () {
        it('onresize should update the width and height', function () {
            var newWidth = 10;
            var newHeight = 10;
            scope.windowWidth = 0;
            scope.windowHeight = 0;
            window.innerWidth = newWidth;
            window.innerHeight = newHeight;

            spyOn(scope, '$apply');

            window.onresize();

            expect(scope.windowWidth).toBe(newWidth);
            expect(scope.windowHeight).toBe(newHeight);
            expect(scope.$apply).toHaveBeenCalled();
        });
    });

});
