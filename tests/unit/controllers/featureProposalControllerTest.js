describe('controller: FeatureProposalController', function () {

    var controller, compile, q, scope, FeatureProposal, FeatureProposalRepo, fps, ServiceRepo, Idea;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.projectService');
        module('mock.serviceRepo');

        inject(function ($controller, $compile, $q, $rootScope, _FeatureProposal_, _FeatureProposalRepo_, FeatureProposalState, _Idea_, _IdeaRepo_, IdeaState, _ProjectService_, _ServiceRepo_) {
            installPromiseMatchers();
            compile = $compile;
            scope = $rootScope.$new();
            q = $q;

            controller = $controller('FeatureProposalController', {
                $scope: scope,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                FeatureProposalState: FeatureProposalState,
                Idea: _Idea_,
                IdeaRepo: _IdeaRepo_,
                IdeaState: IdeaState,
                ProjectService: _ProjectService_,
                ServiceRepo: _ServiceRepo_
            });

            FeatureProposal = _FeatureProposal_;
            FeatureProposalRepo = _FeatureProposalRepo_;
            fps = FeatureProposalState;
            Idea = _Idea_,
            ServiceRepo = _ServiceRepo_;

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
        it('createFeatureProposal should create a feature proposal', function () {
            scope.fpData = new FeatureProposal();
            scope.fpData.title = "New Feature Proposal";
            scope.creating = null;

            scope.createFeatureProposal();
            scope.$digest();

            expect(scope.creating).toBe(false);
        });
        it('editFeatureProposal should open a modal', function () {
            scope.fpData = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editFeatureProposal(mockFeatureProposal1);

            expect(scope.fpData).toEqual(mockFeatureProposal1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('removeIdea should remove an idea', function () {
            var idea1 = Idea();
            var idea2 = Idea();
            idea1.mock(mockIdea1);
            idea2.mock(mockIdea2);

            scope.fpData = new FeatureProposal();
            scope.fpData.mock(mockFeatureProposal1);
            scope.fpData.ideas = [idea1, idea2];
            scope.forms = {
                updateFp: {
                    $setDirty: function() {}
                }
            };
            var length = scope.fpData.ideas.length;

            scope.removeIdea(idea1);

            expect(scope.fpData.ideas.length).toEqual(length - 1);
            expect(scope.removedIdeas.length).toEqual(1);
        });
        it('updateFeatureProposal should update a feature proposal', function () {
            var idea1 = new Idea();
            var idea2 = new Idea();
            idea1.mock(mockIdea1);
            idea2.mock(mockIdea2);

            scope.fpData = new FeatureProposal();
            scope.fpData.mock(mockFeatureProposal1);
            scope.fpData.ideas = [idea1, idea2];

            var deferred = q.defer();
            spyOn(scope.fpRepo, 'update').and.returnValue(deferred.promise);
            scope.updateFeatureProposal();
            deferred.resolve();

            expect(scope.fpRepo.update).toHaveBeenCalled();
        });
        it('confirmReject should open a modal', function () {
            var fp = new FeatureProposal();
            fp.mock(mockFeatureProposal1);
            scope.fpData = fp;
            scope.fpToReject = null;

            spyOn(scope, 'openModal');

            scope.confirmReject(fp);

            expect(scope.fpToReject).toEqual(fp);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('rejectFeatureProposal should set the state to rejected', function () {
            var id = mockFeatureProposal1.id;
            var fp = FeatureProposalRepo.fetchById(id);
            fp.feedback = "Not wanted";
            scope.fpToReject = fp;

            scope.rejectFeatureProposal();

            var updatedFeatureProposal = FeatureProposalRepo.fetchById(id);
            fp.state = "REJECTED";
            expect(updatedFeatureProposal).toEqual(fp);
            expect(updatedFeatureProposal.state).toEqual(fp.state);
            expect(updatedFeatureProposal.feedback).toEqual(fp.feedback);
        });
        it('select should select a feature proposal', function () {
            var modal = angular.element('<div class="modal-body"></div>');
            modal = compile(modal)(scope);
            scope.fpData = null

            spyOn(scope, 'openModal');

            scope.select(mockFeatureProposal1, modal);

            expect(scope.fpData).toEqual(mockFeatureProposal1);
            expect(scope.openModal).toHaveBeenCalledWith(modal);
        });
        it('submitFeatureProposal should submit a feature proposal', function () {
            scope.submitting = null;

            scope.submitFeatureProposal(mockFeatureProposal1);
            scope.$digest();

            expect(scope.submitting).toBe(false);
        });
        it('confirmDeleteFp should assign feature proposal for deletion', function () {
            scope.fpToDelete = null;

            scope.confirmDeleteFp(mockFeatureProposal1);

            expect(scope.fpToDelete).toBe(mockFeatureProposal1);
        });
        it('deleteFp should delete a feature proposal', function () {
            scope.deleting = null;
            scope.fpToDelete = new FeatureProposal();
            scope.fpToDelete.mock(mockFeatureProposal1);

            var deferred = q.defer();
            spyOn(scope.fpToDelete, 'delete').and.returnValue(deferred.promise);
            scope.deleteFp();
            deferred.resolve();

            expect(scope.deleting).toBeTruthy();
            expect(scope.fpToDelete.delete).toHaveBeenCalled();
        });
        it('hasState should return a boolean', function () {
            var fp = mockFeatureProposal1;
            var state = fp.state;

            angular.forEach(fps, function (v, k) {
                state = v.value;
                fp.state = state;
                expect(typeof scope.hasState(state, mockFeatureProposal1)).toEqual("boolean");
            });
        });
        it('getStateSummary should return a string', function () {
            var state;
            angular.forEach(fps, function (v, k) {
                state = v.value;
                expect(typeof scope.getStateSummary(state)).toEqual("string");
            });
        });
    });

});
