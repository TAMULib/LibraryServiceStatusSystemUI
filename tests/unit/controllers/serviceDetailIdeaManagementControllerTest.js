describe('controller: ServiceDetailIdeaManagementController', function () {

    var scope, controller, ServiceRepo;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.projectService');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Idea_, _IdeaRepo_, IdeaState, _FeatureProposal_, _FeatureProposalRepo_, FeatureProposalState, _ProjectService_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('ServiceDetailIdeaManagementController', {
                $scope: scope,
                Idea: _Idea_,
                IdeaRepo: _IdeaRepo_,
                IdeaState: IdeaState,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                FeatureProposalState: FeatureProposalState,
                ProjectService: _ProjectService_,
                ServiceRepo: _ServiceRepo_
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
        it('setOverallCheckbox should be defined', function () {
            expect(scope.setOverallCheckbox).toBeDefined();
            expect(typeof scope.setOverallCheckbox).toEqual("function");
        });
        it('toggleSelectIdea should be defined', function () {
            expect(scope.toggleSelectIdea).toBeDefined();
            expect(typeof scope.toggleSelectIdea).toEqual("function");
        });
        it('toggleAll should be defined', function () {
            expect(scope.toggleAll).toBeDefined();
            expect(typeof scope.toggleAll).toEqual("function");
        });
        it('anyOnPageSelected should be defined', function () {
            expect(scope.anyOnPageSelected).toBeDefined();
            expect(typeof scope.anyOnPageSelected).toEqual("function");
        });
        it('isSelectedIdea should be defined', function () {
            expect(scope.isSelectedIdea).toBeDefined();
            expect(typeof scope.isSelectedIdea).toEqual("function");
        });
        it('removeIdeaFromSelected should be defined', function () {
            expect(scope.removeIdeaFromSelected).toBeDefined();
            expect(typeof scope.removeIdeaFromSelected).toEqual("function");
        });
    });

});
