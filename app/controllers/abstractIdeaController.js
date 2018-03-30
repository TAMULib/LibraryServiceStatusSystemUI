app.controller('AbstractIdeaController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, IdeaRepo, ServiceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.forms = {};

  $scope.fpRepo = FeatureProposalRepo;

  $scope.ideaRepo = IdeaRepo;

  $scope.services = ServiceRepo.getAll();

  $scope.resetForms = function(form) {
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

  $scope.resetFeatureProposals = function () {
    $scope.resetForms($scope.fpData);
    $scope.fpData = new FeatureProposal({
      title: '',
      description: '',
      services: null,
    });
    $scope.closeModal();
  };

  $scope.resetFeatureProposals();

  $scope.createFeatureProposal = function () {
    FeatureProposalRepo.create($scope.fpData).then(function (res) {
      if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
        $scope.resetFeatureProposals();
      }
    });
  };

  $scope.updateFeatureProposal = function(fp) {
    FeatureProposalRepo.update(fp).then(function (res) {
      if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
          $scope.resetFeatureProposals();
      }
    });
  };

});