app.controller('FeatureProposalController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, ProjectService) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.repo = FeatureProposalRepo;

    $scope.fpToDelete = {};

    $scope.ideaToAdd = {};

    $scope.filters = [
        {
            gloss: 'Service',
            property: 'service.name'
        },
        {
            gloss: 'Title',
            property: 'title'
        },
        {
            gloss: 'Description',
            property: 'description'
        },
        {
            gloss: 'Submitted',
            property: 'submitted'
        },
        {
            gloss: 'Last Modified',
            property: 'lastModified'
        }
    ];

    $scope.tableParams = FeatureProposalRepo.getTableParams();

    $scope.editFeatureProposal = function (fp) {
        $scope.fpData = fp;
        $scope.openModal('#editFpModal');
    };

    $scope.removeIdea = function (idea) {
        if ($scope.fpData.ideas.some(function (i) {
            return i.id === idea.id;
        })) {
            $scope.fpData.dirty(true);
            $scope.fpData.ideas.splice($scope.fpData.ideas.indexOf(idea), 1);
        }
    };

    $scope.updateFeatureProposal = function (fp) {
        FeatureProposalRepo.update($scope.fpData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetFeatureProposals();
            }
        });
    };

    $scope.select = function (fp, modal) {
        $scope.fpData = fp;
        $scope.openModal(modal);
    };

    $scope.submitFeatureProposal = function (fp) {
        $scope.submitting = true;
        ProjectService.submitFeatureProposal(fp).then(function () {
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