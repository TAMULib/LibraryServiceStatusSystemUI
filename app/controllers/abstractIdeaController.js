app.controller('AbstractIdeaController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, IdeaRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.selectedIdeas = [];

    $scope.forms = {};

    $scope.fpRepo = FeatureProposalRepo;

    $scope.ideaRepo = IdeaRepo;

    $scope.services = ServiceRepo.getAll();

    $scope.resetForms = function (form) {
        if (form) {
            form.refresh();
            form.clearValidationResults();
        }
        for (var key in $scope.forms) {
            if (!$scope.forms[key].$pristine) {
                $scope.forms[key].$setPristine();
                $scope.forms[key].$setUntouched();
            }
        }
    };

    ServiceRepo.ready().then(function () {

        $scope.resetFeatureProposals = function () {
            $scope.resetForms($scope.fpData);
            $scope.fpData = new FeatureProposal({
                title: '',
                description: '',
                service: $scope.service ? $scope.service : $scope.services[0],
            });
            $scope.closeModal();
            FeatureProposalRepo.getTableParams().reload();
        };

        $scope.resetFeatureProposals();

    });

    $scope.clearOverallCheckbox = function () {
        var overallCheckbox = angular.element('#overallCheckbox')[0];
        if(overallCheckbox) {
            overallCheckbox.indeterminate = false;
            overallCheckbox.checked = false;	
        }
    };

    $scope.createFeatureProposal = function () {
        $scope.creating = true;
        FeatureProposalRepo.create($scope.fpData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.creating = false;
                $scope.resetFeatureProposals();
                $scope.selectedIdeas.length = 0;
                $scope.clearOverallCheckbox();
            }
        });
    };

    $scope.updateFeatureProposal = function (fp) {
        $scope.updating = true;
        FeatureProposalRepo.update(fp).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.updating = false;
                $scope.resetFeatureProposals();
            }
        });
    };

});