describe('controller: ManagementController', function () {

    var controller, scope;

    beforeEach(module('core'));

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('ManagementController', {
            $scope: scope
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});