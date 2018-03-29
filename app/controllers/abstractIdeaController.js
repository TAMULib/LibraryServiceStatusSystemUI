app.controller('AbstractIdeaController', function ($controller, $scope, FeatureProposalRepo, IdeaRepo, ServiceRepo) {

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

});