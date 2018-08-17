describe('controller: AbstractIdeaController', function () {

    var controller, scope, compile;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.featureProposal');
        module('mock.featureProposalRepo');
        module('mock.ideaRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, $compile, _FeatureProposal_, _FeatureProposalRepo_, _IdeaRepo_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            ServiceRepo = _ServiceRepo_;
            controller = $controller('AbstractIdeaController', {
                $scope: scope,
                FeatureProposal: _FeatureProposal_,
                FeatureProposalRepo: _FeatureProposalRepo_,
                IdeaRepo: _IdeaRepo_,
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
            var element = angular.element('<form name="testForm"><div class="modal-body"><input name="testInput" ng-model="temp" value=""></div></form>');
            element = compile(element)(scope);
            var form = scope.testForm;

            spyOn(form, '$setPristine');
            form.$setDirty();

            scope.forms.testForm = form;
            scope.resetForms();
            expect(form.$setPristine).toHaveBeenCalled();
        });
    });
});
