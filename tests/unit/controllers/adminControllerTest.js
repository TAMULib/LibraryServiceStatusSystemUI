describe('controller: AdminController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.user');

        inject(function ($controller, $rootScope, _User_, _UserService_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('AdminController', {
                $scope: scope,
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
