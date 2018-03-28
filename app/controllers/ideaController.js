app.controller('IdeaController', function ($controller, $routeParams, $scope, FeatureProposal, Idea, IdeaRepo, ServiceRepo) {

    angular.extend(this, $controller('FeatureProposalController', {
        $scope: $scope
    }));

    $scope.ideaRepo = IdeaRepo;

    $scope.modalData = {
        title: '',
        description: '',
    };

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

    });

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists textcolor",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | numlist bullist | forecolor backcolor"
    };

});