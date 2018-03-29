app.controller('FeatureProposalController', function ($controller, $scope, ServiceRepo, FeatureProposal, FeatureProposalRepo) {

  angular.extend(this, $controller('AbstractIdeaController', {
    $scope: $scope
  }));

  ServiceRepo.ready().then(function () {
    $scope.tableParams = FeatureProposalRepo.getTableParams();
    $scope.tableParams.filters = {};
    $scope.tableParams.sort = [{
      property: 'featureProposal.name',
      direction: 'ASC'
    }, {
      property: 'lastModified',
      direction: 'DESC'
    }];
  });

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

  $scope.editFeatureProposal = function(fp) {

  };

  $scope.updateFeatureProposal = function(fp) {

  };

});