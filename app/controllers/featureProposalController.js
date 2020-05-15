app.controller('FeatureProposalController', function ($controller, $scope, Idea, IdeaState, FeatureProposalState, ProductService) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.fpToDelete = {};

    $scope.ideaToAdd = {};

    $scope.state = FeatureProposalState;

    $scope.removedIdeas = [];

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

    $scope.updateFeatureProposal = function () {
        $scope.fpData.dirty(true);
        $scope.fpRepo.update($scope.fpData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetFeatureProposals();
                for (var i in $scope.removedIdeas) {
                    var idea = $scope.removedIdeas[i];
                    idea.state = IdeaState.WAITING_ON_REVIEW.value;
                    idea.save();
                }
                $scope.removedIdeas.length = 0;
            }
        });
    };

    $scope.confirmReject = function (fp) {
        $scope.resetFeatureProposals();
        $scope.openModal('#rejectFpModal');
        $scope.fpToReject = fp;
    };

    $scope.rejectFeatureProposal = function () {
        $scope.updating = true;
        $scope.fpRepo.reject($scope.fpToReject).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetFeatureProposals();
                $scope.fpToReject = {};
            }
            $scope.updating = false;
        });
    };

    $scope.select = function (fp, modal) {
        $scope.fpData = fp;
        $scope.openModal(modal);
    };

    $scope.submitFeatureProposal = function (fp) {
        $scope.submitting = true;
        ProductService.submitFeatureProposal(fp).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.submitting = false;
                $scope.resetFeatureProposals();
            }
        });
    };

    $scope.confirmDeleteFp = function (fp) {
        $scope.openModal('#deleteFpModal');
        $scope.fpToDelete = fp;
    };

    $scope.deleteFp = function () {
        $scope.deleting = true;
        $scope.fpToDelete.delete().then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.closeModal();
                $scope.deleting = false;
                $scope.fpToDelete = {};
            }
        });
    };

    $scope.hasState = function (state, fp) {
        return fp && fp.state === FeatureProposalState[state].value;
    };

    $scope.getStateSummary = function (state) {
        return FeatureProposalState[state] === undefined ? "" : FeatureProposalState[state].summary;
    };

    $scope.initCreateFeatureProposal = function () {
        $scope.fpData.state = FeatureProposalState.IN_PROGRESS.value;
        $scope.fpData.isPrivate = false;
        $scope.openModal('#addFpModal');
    };

});
