app.controller('FeatureProposalController', function ($controller, $routeParams, $scope, Idea, ServiceRepo, FeatureProposal, FeatureProposalRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  ServiceRepo.ready().then(function() {
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

  $scope.forms = {};

  $scope.fpRepo = FeatureProposalRepo;

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

  $scope.resetIdeas = function () {
    $scope.resetForms($scope.ideaData);
    $scope.ideaData = new Idea({
        title: '',
        description: '',
        service: $scope.services[0]
    });
    $scope.closeModal();
  };

  $scope.resetIdeas();

  $scope.resetFeatureProposals = function () {
    $scope.resetForms($scope.fpData);
    $scope.fpData = new FeatureProposal({
        title: '',
        description: '',
        services: null,
    });
    $scope.closeModal();
};

$scope.createFeatureProposal = function() {
  FeatureProposalRepo.create($scope.fpData).then(function(res) {
    if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
      $scope.resetFeatureProposals();
    }
  });
};

$scope.resetFeatureProposals();

$scope.confirmElevate = function(idea) {
    $scope.ideaToElevate = idea;
    $scope.openModal('#elevateIdeaModal');
};

$scope.elevateIdea = function(idea) {
  FeatureProposalRepo.elevate(idea).then(function(res) {
    var message = angular.fromJson(res.body);
    if (message.meta.status === 'SUCCESS') {
      angular.extend(FeatureProposalRepo, message.payload);
    }
  });
};

});