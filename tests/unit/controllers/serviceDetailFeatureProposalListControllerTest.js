describe('controller: ServiceDetailFeatureProposalListController', function () {

    var scope, controller, ServiceRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.projectService');
        module('mock.serviceRepo');
        module('mock.user');
        module('mock.userRepo');

        inject(function ($controller, $rootScope, _FeatureProposal_, _FeatureProposalRepo_, FeatureProposalState, _Idea_, _IdeaRepo_, IdeaState, _ProjectService_, _ServiceRepo_, _User_, _UserRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ServiceDetailFeatureProposalListController', {
                $scope: scope,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                FeatureProposalState: FeatureProposalState,
                Idea: _Idea_,
                IdeaRepo: _IdeaRepo_,
                IdeaState: IdeaState,
                ProjectService: _ProjectService_,
                ServiceRepo: _ServiceRepo_,
                User: _User_,
                UserRepo: _UserRepo_
            });

            // ensure that the isReady() is called.
            //scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('isVotingOpen should be defined', function () {
            expect(scope.isVotingOpen).toBeDefined();
            expect(typeof scope.isVotingOpen).toEqual("function");
        });
        it('vote should be defined', function () {
            expect(scope.vote).toBeDefined();
            expect(typeof scope.vote).toEqual("function");
        });
    });

});
