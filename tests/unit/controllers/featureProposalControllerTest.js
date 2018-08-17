describe('controller: FeatureProposalController', function () {

    var controller, scope, compile, fps, FeatureProposalRepo;

    beforeEach(function () {
        module('core');
        module('app');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.projectService');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, $compile, _Idea_, _IdeaRepo_, IdeaState, _FeatureProposal_, _FeatureProposalRepo_, FeatureProposalState, _ProjectService_, _ServiceRepo_) {
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
            compile = $compile;
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
        it('editFeatureProposal should open a modal', function () {
            scope.fpData = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editFeatureProposal(mockFeatureProposal1);
            expect(scope.fpData).toEqual(mockFeatureProposal1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('removeIdea should remove an idea', function () {
            scope.fpData = mockFeatureProposal1;
            scope.fpData.ideas = [mockIdea1, mockIdea2];
            scope.forms = {
                updateFp: {
                    $setDirty: function() {}
                }
            };
            var length = scope.fpData.ideas.length;

            scope.removeIdea(mockIdea1);
            expect(scope.fpData.ideas.length).toEqual(length - 1);
            expect(scope.removedIdeas.length).toEqual(1);
        });
        // test not working.
        /*it('updateFeatureProposal should update a feature proposal', function () {
            scope.fpData = mockFeatureProposal1;
            scope.fpData.ideas = [mockIdea1, mockIdea2];

            spyOn(scope.fpRepo, 'update');

            scope.updateFeatureProposal();
            expect(scope.fpRepo.update).toHaveBeenCalled();
        });*/
        // test not working.
        /*
        it('confirmReject should open a modal', function () {
            var element = angular.element('<form name="testForm"><div class="modal-body"><input name="testInput" ng-model="temp" value=""></div></form>');
            element = compile(element)(scope);
            var form = scope.testForm;
            scope.forms.testForm = form;

            // digest must be called to trigger the promise to then trigger the repo's ready() promise to be returned.
            scope.$digest();

            scope.fpToReject = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmReject(mockFeatureProposal1);
            expect(scope.fpToReject).toEqual(mockFeatureProposal1);
            expect(scope.openModal).toHaveBeenCalled();
        });*/
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
        it('rejectFeatureProposal should set the state to rejected', function () {
            var id = 123456789;
            var fp = FeatureProposalRepo.fetchById(id);
            fp.state = "REJECTED";
            fp.feedback = "Not wanted";
            scope.fpToReject = fp;
            scope.rejectFeatureProposal();

            var updatedFeatureProposal = FeatureProposalRepo.fetchById(id);
            expect(updatedFeatureProposal).toEqual(fp);
            expect(updatedFeatureProposal.state).toEqual(fp.state);
            expect(updatedFeatureProposal.feedback).toEqual(fp.feedback);
        });
    });

});
