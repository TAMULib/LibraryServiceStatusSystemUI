app.controller('FeatureProposalController', function ($controller, $scope, Idea, FeatureProposal, FeatureProposalRepo, ProjectService) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.repo = FeatureProposalRepo;

    $scope.fpToDelete = {};

    $scope.ideaToAdd = {};

    $scope.tableConfig = {
        properties: [
            {
                gloss: 'Service',
                property: 'service.name',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Title',
                property: 'title',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Description',
                property: 'description',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Submitted',
                property: 'submitted',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Last Modified',
                property: 'lastModified',
                filterable: true,
                sortable: true
            }
        ],
        activeSort: [
            {
                property: 'service.name',
                direction: 'ASC'
            },
            {
                property: 'lastModified',
                direction: 'DESC'
            }
        ]
    };

    $scope.removedIdeas = [];

    $scope.tableParams = FeatureProposalRepo.getTableParams();

    $scope.editFeatureProposal = function (fp) {
        $scope.fpData = fp;
        $scope.openModal('#editFpModal');
    };

    $scope.removeIdea = function (idea) {
        if ($scope.fpData.ideas.some(function (i) {
            return i.id === idea.id;
        })) {
            $scope.removedIdeas.push(new Idea(idea));
            $scope.forms.updateFp.$setDirty();
            $scope.fpData.dirty(true);
            $scope.fpData.ideas.splice($scope.fpData.ideas.indexOf(idea), 1);
        }
    };

    $scope.updateFeatureProposal = function (fp) {
        FeatureProposalRepo.update($scope.fpData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetFeatureProposals();
                for(var i in $scope.removedIdeas) {
                    var idea = $scope.removedIdeas[i];
                    idea.elevated = false;
                    idea.save();
                }
                $scope.removedIdeas.length = 0;
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

    $scope.confirmDeleteFp = function (fp) {
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