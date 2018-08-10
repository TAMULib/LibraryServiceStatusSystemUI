describe('controller: FeatureProposalController', function () {

    var controller, scope, fps;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.idea');
        module('mock.featureProposal');
        module('mock.projectService');
        module('mock.featureProposalRepo');
        module('mock.ideaRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Idea_, _FeatureProposal_, FeatureProposalState, _ProjectService_, _FeatureProposalRepo_, _IdeaRepo_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            fps = FeatureProposalState;
            controller = $controller('FeatureProposalController', {
                $scope: scope,
                Idea: _Idea_,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalState: FeatureProposalState,
                ProjectService: _ProjectService_
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
    });
});
