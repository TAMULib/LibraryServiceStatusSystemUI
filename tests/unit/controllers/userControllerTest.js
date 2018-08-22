describe('controller: UserController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.user');
        module('mock.userService');
        module('mock.storageService');

        inject(function ($controller, $rootScope, _User_, _UserService_, _StorageService_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('UserController', {
                $scope: scope,
                User: _User_,
                UserService: _UserService_,
                StorageService: _StorageService_
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
