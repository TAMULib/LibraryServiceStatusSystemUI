app.controller('FeatureProposalController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, ProjectService) {

  angular.extend(this, $controller('AbstractIdeaController', {
    $scope: $scope
  }));

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

  $scope.select = function(fp, modal) {
    $scope.fpData = fp;
    $scope.openModal(modal);
  };

  $scope.submitFeatureProposal = function(fp) {
    $scope.submitting = true;
    ProjectService.submitFeatureProposal(fp).then(function() {
      $scope.submitting = false;
      $scope.resetFeatureProposals();
    });
  };

  $scope.editFeatureProposal = function(fp) {

  };

  $scope.updateFeatureProposal = function(fp) {

  };

});