describe('controller: IdeaController', function () {

    var controller, scope;

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
            controller = $controller('IdeaController', {
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
        it('createIdea should be defined', function () {
            expect(scope.createIdea).toBeDefined();
            expect(typeof scope.createIdea).toEqual("function");
        });
        it('editIdea should be defined', function () {
            expect(scope.editIdea).toBeDefined();
            expect(typeof scope.editIdea).toEqual("function");
        });
        it('updateIdea should be defined', function () {
            expect(scope.updateIdea).toBeDefined();
            expect(typeof scope.updateIdea).toEqual("function");
        });
        it('confirmReject should be defined', function () {
            expect(scope.confirmReject).toBeDefined();
            expect(typeof scope.confirmReject).toEqual("function");
        });
        it('rejectIdea should be defined', function () {
            expect(scope.rejectIdea).toBeDefined();
            expect(typeof scope.rejectIdea).toEqual("function");
        });
        it('confirmSendToHelpdesk should be defined', function () {
            expect(scope.confirmSendToHelpdesk).toBeDefined();
            expect(typeof scope.confirmSendToHelpdesk).toEqual("function");
        });
        it('sendToHelpdesk should be defined', function () {
            expect(scope.sendToHelpdesk).toBeDefined();
            expect(typeof scope.sendToHelpdesk).toEqual("function");
        });
        it('confirmDelete should be defined', function () {
            expect(scope.confirmDelete).toBeDefined();
            expect(typeof scope.confirmDelete).toEqual("function");
        });
        it('deleteIdea should be defined', function () {
            expect(scope.deleteIdea).toBeDefined();
            expect(typeof scope.deleteIdea).toEqual("function");
        });
        it('elevateIdea should be defined', function () {
            expect(scope.elevateIdea).toBeDefined();
            expect(typeof scope.elevateIdea).toEqual("function");
        });
        it('confirmElevateMultiple should be defined', function () {
            expect(scope.confirmElevateMultiple).toBeDefined();
            expect(typeof scope.confirmElevateMultiple).toEqual("function");
        });
        it('confirmAddIdea should be defined', function () {
            expect(scope.confirmAddIdea).toBeDefined();
            expect(typeof scope.confirmAddIdea).toEqual("function");
        });
        it('addIdea should be defined', function () {
            expect(scope.addIdea).toBeDefined();
            expect(typeof scope.addIdea).toEqual("function");
        });
        it('setSelectedFp should be defined', function () {
            expect(scope.setSelectedFp).toBeDefined();
            expect(typeof scope.setSelectedFp).toEqual("function");
        });
    });

});
