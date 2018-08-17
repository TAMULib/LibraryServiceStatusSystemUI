describe('controller: UserRepoController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.storageService');
        module('mock.user');
        module('mock.userService');

        inject(function ($controller, $rootScope, $location, $injector, $route, _User_, _StorageService_, _UserService_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('UserRepoController', {
                $scope: scope,
                $location: $location,
                $injector: $injector,
                $route: $route,
                User: _User_,
                StorageService: _StorageService_,
                UserService: _UserService_
            });
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
