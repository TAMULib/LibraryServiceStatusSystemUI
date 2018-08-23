describe('controller: AbstractIdeaController', function () {

    var controller, compile, q, scope, FeatureProposal, Idea;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.idea');
        module('mock.ideaRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $compile, $q, $rootScope, _FeatureProposal_, _FeatureProposalRepo_, _Idea_, _IdeaRepo_, _ServiceRepo_) {
            installPromiseMatchers();
            compile = $compile;
            scope = $rootScope.$new();
            q = $q;

            controller = $controller('AbstractIdeaController', {
                $scope: scope,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                IdeaRepo: _IdeaRepo_,
                ServiceRepo: _ServiceRepo_
            });

            FeatureProposal = _FeatureProposal_;
            Idea = _Idea_;
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
        it('resetForms should be defined', function () {
            expect(scope.resetForms).toBeDefined();
            expect(typeof scope.resetForms).toEqual("function");
        });
        it('clearOverallCheckbox should be defined', function () {
            expect(scope.clearOverallCheckbox).toBeDefined();
            expect(typeof scope.clearOverallCheckbox).toEqual("function");
        });
        it('createFeatureProposal should be defined', function () {
            expect(scope.createFeatureProposal).toBeDefined();
            expect(typeof scope.createFeatureProposal).toEqual("function");
        });
        it('updateFeatureProposal should be defined', function () {
            expect(scope.updateFeatureProposal).toBeDefined();
            expect(typeof scope.updateFeatureProposal).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('resetForms should reset the forms', function () {
            var element = compile('<form name="testForm"><input name="testInput" ng-model="temp" value=""></form>')(scope);
            var form;
            scope.$digest();
            form = scope.testForm;

            spyOn(form, '$setPristine');
            form.$setDirty();

            scope.forms.testForm = form;
            scope.resetForms();
            expect(form.$setPristine).toHaveBeenCalled();
        });
        it('clearOverallCheckbox should clear overall checboxes', function () {
            var overallCheckbox = compile('<input id="overallCheckbox" name="overallCheckbox" ng-model="temp" type="checkbox" checked="checked">')(scope);
            scope.$digest();

            scope.clearOverallCheckbox();

            expect(overallCheckbox[0].indeterminate).toBe(false);
            expect(overallCheckbox[0].checked).toBe(false);
        });
        it('createFeatureProposal should create a feature proposal', function () {
            scope.fpData = new FeatureProposal();
            scope.fpData.title = "New Feature Proposal";
            scope.creating = null;

            scope.createFeatureProposal();
            scope.$digest();

            expect(scope.creating).toBe(false);
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
    });
});
