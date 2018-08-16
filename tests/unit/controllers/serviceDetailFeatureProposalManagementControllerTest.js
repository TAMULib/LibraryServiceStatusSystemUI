describe('controller: ServiceDetailFeatureProposalManagementController', function () {

    var scope, controller, ServiceRepo;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.projectService');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.userRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Idea_, _IdeaRepo_, IdeaState, _FeatureProposal_, _FeatureProposalRepo_, FeatureProposalState, _ProjectService_, _UserRepo_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('ServiceDetailFeatureProposalManagementController', {
                $scope: scope,
                Idea: _Idea_,
                IdeaRepo: _IdeaRepo_,
                IdeaState: IdeaState,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                FeatureProposalState: FeatureProposalState,
                ProjectService: _ProjectService_,
                UserRepo: _UserRepo_,
                ServiceRepo: _ServiceRepo_
            });
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
