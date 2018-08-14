describe('controller: FeatureProposalController', function () {

    var controller, scope, fps, FeatureProposalRepo;

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
            fps = FeatureProposalState;
            FeatureProposalRepo = _FeatureProposalRepo_;
            controller = $controller('FeatureProposalController', {
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
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('editFeatureProposal should be defined', function () {
            expect(scope.editFeatureProposal).toBeDefined();
            expect(typeof scope.editFeatureProposal).toEqual("function");
        });
        it('removeIdea should be defined', function () {
            expect(scope.removeIdea).toBeDefined();
            expect(typeof scope.removeIdea).toEqual("function");
        });
        it('updateFeatureProposal should be defined', function () {
            expect(scope.updateFeatureProposal).toBeDefined();
            expect(typeof scope.updateFeatureProposal).toEqual("function");
        });
        it('rejectFeatureProposal should be defined', function () {
            expect(scope.rejectFeatureProposal).toBeDefined();
            expect(typeof scope.rejectFeatureProposal).toEqual("function");
        });
        it('select should be defined', function () {
            expect(scope.select).toBeDefined();
            expect(typeof scope.select).toEqual("function");
        });
        it('submitFeatureProposal should be defined', function () {
            expect(scope.submitFeatureProposal).toBeDefined();
            expect(typeof scope.submitFeatureProposal).toEqual("function");
        });
        it('confirmDeleteFp should be defined', function () {
            expect(scope.confirmDeleteFp).toBeDefined();
            expect(typeof scope.confirmDeleteFp).toEqual("function");
        });
        it('deleteFp should be defined', function () {
            expect(scope.deleteFp).toBeDefined();
            expect(typeof scope.deleteFp).toEqual("function");
        });
        it('hasState should be defined', function () {
            expect(scope.hasState).toBeDefined();
            expect(typeof scope.hasState).toEqual("function");
        });
        it('getStateSummary should be defined', function () {
            expect(scope.getStateSummary).toBeDefined();
            expect(typeof scope.getStateSummary).toEqual("function");
        });
        it('initCreateFeatureProposal should be defined', function () {
            expect(scope.initCreateFeatureProposal).toBeDefined();
            expect(typeof scope.initCreateFeatureProposal).toEqual("function");
        });
    });

    describe('Are the scope methods working as expected', function () {
        it('hasState should return a boolean', function () {
            var state = "IN_PROGRESS";
            var fp = {
                state: state
            };
            expect(typeof scope.hasState(state, fp)).toEqual("boolean");
        });
    });

    describe('Are the scope methods working as expected', function () {
        it('hasState should return a boolean', function () {
            var state;
            var fp = {
                state: state
            };

            angular.forEach(fps, function(v, k) {
                state = v.value;
                fp.state = state;
                expect(typeof scope.hasState(state, fp)).toEqual("boolean");
            });
        });

        it('getStateSummary should return a string', function () {
            var state;
            angular.forEach(fps, function(v, k) {
                state = v.value;
                expect(typeof scope.getStateSummary(state)).toEqual("string");
            });
        });

        it('rejectFeatureProposal should set the state to rejected', function () {
            var id = 123456789;
            var featureProposal = FeatureProposalRepo.fetchById(id);
            featureProposal.state = "REJECTED";
            scope.rejectFeatureProposal(id);
            expect(FeatureProposalRepo.fetchById(id)).toEqual(featureProposal);
        });
    });
});
