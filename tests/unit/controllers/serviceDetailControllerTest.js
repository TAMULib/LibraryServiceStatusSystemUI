describe('controller: ServiceDetailController', function () {

    var scope, controller;

    beforeEach(module('core'));

    beforeEach(module('app'));

    beforeEach(module('mock.featureProposalRepo'));

    beforeEach(module('mock.serviceRepo'));

    beforeEach(module('mock.userRepo'));

    beforeEach(module('mock.userService'));
    beforeEach(module('mock.user'));

    beforeEach(inject(function ($controller, $rootScope, _FeatureProposalRepo_, _ServiceRepo_, _User_, _UserService_, _UserRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        controller = $controller('ServiceDetailController', {
            $scope: scope,
            FeatureProposalRepo: _FeatureProposalRepo_,
            ServiceRepo: _ServiceRepo_,
            User: _User_,
            UserService: _UserService_,
            UserRepo: _UserRepo_
        });

    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});