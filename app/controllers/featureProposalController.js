app.controller('FeatureProposalController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, ProjectService) {

  angular.extend(this, $controller('AbstractIdeaController', {
    $scope: $scope
  }));

  $scope.fpToDelete = {};

  $scope.editFeatureProposal = function(fp) {
    $scope.fpData = fp;
    $scope.openModal('#editFpModal');
  };

  $scope.updateFeatureProposal = function(fp) {
    FeatureProposalRepo.update($scope.fpData).then(function (res) {
      if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
          $scope.resetFeatureProposals();
      }
    });
  };

  $scope.removeIdea = function(idea) {
    if ($scope.fpData.ideas.some(function(i) {
      return i.id === idea.id;
    })) {
      $scope.fpData.ideas.splice($scope.fpData.ideas.indexOf(idea), 1);
    }
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

  $scope.confirmDelete = function (fp) {
    $scope.openModal('#deleteFpModal');
    $scope.fpToDelete = fp;
  };

  $scope.deleteFp = function () {
    $scope.deleting = true;
    $scope.fpToDelete.delete().then(function () {
      $scope.closeModal();
      $scope.deleting = false;
      $scope.fpToDelete = {};
    });
  };

});