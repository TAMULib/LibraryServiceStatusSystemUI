app.controller('IdeaController', function ($controller, $scope, FeatureProposalRepo, Idea, IdeaRepo, ServiceRepo) {

  angular.extend(this, $controller('AbstractIdeaController', {
    $scope: $scope
  }));

  $scope.ideaToDelete = {};

  ServiceRepo.ready().then(function () {
    $scope.tableParams = IdeaRepo.getTableParams();
    IdeaRepo.getPageSettings().filters = {};
    IdeaRepo.getPageSettings().sort = [{
      property: 'service.name',
      direction: 'ASC'
    }, {
      property: 'lastModified',
      direction: 'DESC'
    }];
  });

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

  $scope.createIdea = function () {
    IdeaRepo.create($scope.ideaData).then(function (res) {
      if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
        $scope.resetIdeas();
      }
    });
  };

  $scope.editIdea = function (idea) {
    $scope.ideaData = idea;
    $scope.openModal('#editIdeaModal');
  };

  $scope.updateIdea = function () {
    IdeaRepo.update($scope.ideaData).then(function (res) {
      if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
        $scope.resetIdeas();
      }
    });
  };

  $scope.confirmDelete = function (idea) {
    $scope.openModal('#deleteIdeaModal');
    $scope.ideaToDelete = idea;
  };

  $scope.deleteIdea = function () {
    $scope.deleting = true;
    $scope.ideaToDelete.delete().then(function () {
      $scope.closeModal();
      $scope.deleting = false;
      $scope.ideaToDelete = {};
    });
  };

  $scope.confirmElevate = function (idea) {
    $scope.ideaToElevate = idea;
    $scope.openModal('#elevateIdeaModal');
  };

  $scope.elevateIdea = function (idea) {
    console.log(idea);
    FeatureProposalRepo.elevate(idea).then(function (res) {
      var message = angular.fromJson(res.body);
      if (message.meta.status === 'SUCCESS') {
        angular.extend(FeatureProposalRepo, message.payload);
      }
    });
  };

  $scope.tinymceOptions = {
    selector: 'textarea',
    theme: "modern",
    plugins: "link lists textcolor",
    toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | numlist bullist | forecolor backcolor"
  };

});