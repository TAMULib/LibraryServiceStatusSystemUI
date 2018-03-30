app.controller('FeatureProposalController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo) {

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