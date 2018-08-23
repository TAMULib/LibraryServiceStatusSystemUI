describe('controller: UserRepoController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.storageService');
        module('mock.user');
        module('mock.userService');

        inject(function ($controller, $injector, $location, $rootScope, $route, _StorageService_, _User_, _UserService_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('UserRepoController', {
                $injector: $injector,
                $location: $location,
                $route: $route,
                $scope: scope,
                StorageService: _StorageService_,
                User: _User_,
                UserService: _UserService_
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

});
