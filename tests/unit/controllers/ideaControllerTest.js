describe('controller: IdeaController', function () {

    var controller, q, scope, FeatureProposal, FeatureProposalRepo, Idea, IdeaRepo, Service;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.productService');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($controller, $q, $rootScope, _FeatureProposal_, _FeatureProposalRepo_, FeatureProposalState, _Idea_, _IdeaRepo_, IdeaState, _ProductService_, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            controller = $controller('IdeaController', {
                $scope: scope,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                FeatureProposalState: FeatureProposalState,
                Idea: _Idea_,
                IdeaRepo: _IdeaRepo_,
                IdeaState: IdeaState,
                ProductService: _ProductService_,
                ServiceRepo: _ServiceRepo_
            });

            FeatureProposal = _FeatureProposal_;
            FeatureProposalRepo = _FeatureProposalRepo_;
            Idea = _Idea_;
            IdeaRepo = _IdeaRepo_;
            Service = _Service_;

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('createFeatureProposal should be defined', function () {
            expect(scope.createFeatureProposal).toBeDefined();
            expect(typeof scope.createFeatureProposal).toEqual("function");
        });
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
        it('resetIdeas should be defined', function () {
            expect(scope.resetIdeas).toBeDefined();
            expect(typeof scope.resetIdeas).toEqual("function");
        });
    });

    describe('Are the scope methods working as expected', function () {
        it('createFeatureProposal should create a feature proposal', function () {
            scope.fpData = new FeatureProposal();
            scope.fpData.title = "New Feature Proposal";
            scope.creating = null;

            scope.createFeatureProposal();
            scope.$digest();

            expect(scope.creating).toBe(false);
        });
        it('createIdea should create an idea', function () {
            scope.fpData = new FeatureProposal();
            scope.fpData.title = "New Feature Proposal";
            scope.creating = null;

            scope.createFeatureProposal();
            scope.$digest();

            expect(scope.creating).toBe(false);
        });
        it('editIdea should open a modal', function () {
            var idea = new Idea();
            idea.mock(mockIdea1);
            scope.ideaData = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editIdea(idea);

            expect(scope.ideaData).toEqual(idea);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('updateFeatureProposal should update a feature proposal', function () {
            scope.ideaData = new Idea();
            scope.ideaData.mock(mockIdea1);

            var deferred = q.defer();
            spyOn(scope.ideaRepo, 'update').and.returnValue(deferred.promise);
            scope.updateIdea();
            deferred.resolve();

            expect(scope.ideaRepo.update).toHaveBeenCalled();
        });
        it('confirmReject should open a modal', function () {
            var idea = new Idea();
            idea.mock(mockIdea1);
            scope.ideaToReject = idea;
            scope.fpToReject = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmReject(idea);

            expect(scope.ideaToReject).toEqual(idea);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('rejectIdea should set the state to rejected', function () {
            var id = mockIdea1.id;
            var idea = IdeaRepo.fetchById(id);
            idea.feedback = "Not wanted";
            scope.ideaToReject = idea;

            scope.rejectIdea();

            var updatedIdea = IdeaRepo.fetchById(id);
            idea.state = "REJECTED";
            expect(updatedIdea).toEqual(idea);
            expect(updatedIdea.state).toEqual(idea.state);
            expect(updatedIdea.feedback).toEqual(idea.feedback);
        });
        it('confirmSendToHelpdesk should open a modal', function () {
            var idea = new Idea();
            idea.mock(mockIdea1);
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmSendToHelpdesk(idea);

            expect(scope.ideaToSendToHelpdesk).toEqual(idea);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('sendToHelpdesk should set the state to elevated', function () {
            var id = mockIdea1.id;
            var idea = IdeaRepo.fetchById(id);
            scope.ideaToSendToHelpdesk = idea;

            scope.sendToHelpdesk();

            var updatedIdea = IdeaRepo.fetchById(id);
            idea.state = "ELEVATED";
            expect(updatedIdea).toEqual(idea);
            expect(updatedIdea.state).toEqual(idea.state);
        });
        it('confirmDelete should assign idea for deletion', function () {
            scope.ideaToDelete = null;

            scope.confirmDelete(mockIdea1);

            expect(scope.ideaToDelete).toBe(mockIdea1);
        });
        it('deleteIdea should delete an idea', function () {
            scope.deleting = null;
            scope.ideaToDelete = new Idea();
            scope.ideaToDelete.mock(mockIdea1);

            var deferred = q.defer();
            spyOn(scope.ideaToDelete, 'delete').and.returnValue(deferred.promise);
            scope.deleteIdea();
            deferred.resolve();

            // todo: more work needs to be done, this should be testig for deleting toBe(false).
            expect(scope.deleting).toBeTruthy();
            expect(scope.ideaToDelete.delete).toHaveBeenCalled();
        });
        it('elevateIdea should elevate an idea', function () {
            scope.elevating = null;
            var idea = new Idea();
            idea.mock(mockIdea1);

            var deferred = q.defer();
            spyOn(FeatureProposalRepo, 'elevate').and.returnValue(deferred.promise);
            scope.elevateIdea(idea);
            deferred.resolve();

            expect(scope.elevating).toBeTruthy();
            expect(FeatureProposalRepo.elevate).toHaveBeenCalled();
        });
        it('elevateIdea should elevate an idea', function () {
            scope.elevating = null;
            var idea1 = new Idea();
            var idea2 = new Idea();
            var ideas = [idea1, idea2];
            idea1.mock(mockIdea1);
            idea2.mock(mockIdea2);
            scope.fpData = new FeatureProposal();
            scope.fpData.mock(mockFeatureProposal1);
            scope.fpData.ideas = [];
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmElevateMultiple(ideas);

            expect(scope.openModal).toHaveBeenCalled();
            expect(scope.fpData.ideas).toEqual(ideas);
        });
        it('confirmAddIdea should popup a confirmation modal', function () {
            var idea = new Idea();
            idea.mock(mockIdea1);
            scope.ideaToAdd = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmAddIdea(idea);

            expect(scope.openModal).toHaveBeenCalled();
            expect(scope.ideaToAdd).toBe(idea);
        });
        it('addIdea should add an idea', function () {
            var fp = new FeatureProposal();
            var idea = new Idea();
            fp.mock(mockFeatureProposal1);
            idea.mock(mockIdea1);
            fp.ideas = [];
            scope.ideaToAdd = idea;

            spyOn(scope, 'updateFeatureProposal');

            scope.addIdea(fp);

            expect(scope.updateFeatureProposal).toHaveBeenCalled();
            expect(fp.ideas).toEqual([idea]);
            expect(fp.isDirty).toEqual(true);
        });
        it('setSelectedFp should select a feature proposal', function () {
            var fp = new FeatureProposal();
            fp.mock(mockFeatureProposal1);
            scope.selectedFp = null;

            scope.setSelectedFp(fp);

            expect(scope.selectedFp).toEqual(fp);
        });
        it('resetIdeas should reset ideas', function () {
            var service = new Service();
            service.mock(mockService1);
            scope.service = service;
            scope.ideaData = null;
            scope.closeModal = function() {};

            spyOn(scope, 'resetForms');
            spyOn(scope, 'closeModal');

            scope.resetIdeas();

            expect(scope.resetForms).toHaveBeenCalled();
            expect(scope.closeModal).toHaveBeenCalled();
            expect(scope.ideaData).not.toEqual(null);
        });
    });
});
