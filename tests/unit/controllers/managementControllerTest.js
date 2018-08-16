describe('controller: ManagementController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('ManagementController', {
                $scope: scope
            });
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
