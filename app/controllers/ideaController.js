app.controller('IdeaController', function ($controller, $scope, FeatureProposalRepo, Idea, IdeaState, ServiceRepo) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.ideaToDelete = {};

    $scope.states = IdeaState;

    ServiceRepo.ready().then(function () {

        $scope.featureProposalsTableParams = FeatureProposalRepo.getTableParams();

        $scope.resetIdeas = function () {
            $scope.resetForms($scope.ideaData);
            $scope.ideaData = new Idea({
                title: '',
                description: '',
                service: $scope.service ? $scope.service : $scope.services[0]
            });
            $scope.closeModal();
        };

        $scope.resetIdeas();

    });

    $scope.createIdea = function () {
        $scope.creating = true;
        $scope.ideaRepo.create($scope.ideaData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.creating = false;
                $scope.resetIdeas();
            }
        });
    };

    $scope.editIdea = function (idea) {
        $scope.ideaData = idea;
        $scope.openModal('#editIdeaModal');
    };

    $scope.updateIdea = function () {
        $scope.updating = true;
        $scope.ideaData.dirty(true);
        $scope.ideaRepo.update($scope.ideaData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.updating = false;
                $scope.resetIdeas();
            }
        });
    };

    $scope.confirmReject = function (idea) {
        $scope.resetIdeas();
        $scope.openModal('#rejectIdeaModal');
        $scope.ideaToReject = idea;
    };

    $scope.rejectIdea = function () {
        $scope.updating = true;
        $scope.ideaRepo.reject($scope.ideaToReject).then(function (res) {
            var apiRes = angular.fromJson(res.body);
            if (apiRes.meta.status === 'SUCCESS') {
                $scope.resetIdeas();
                $scope.updating = false;
                $scope.ideaToReject = {};
            } else if (apiRes.meta.status === 'INVALID') {
                $scope.updating = false;
            }
        });
    };

    $scope.confirmSendToHelpdesk = function (idea) {
        $scope.resetIdeas();
        $scope.openModal('#sendToHelpdeskModal');
        $scope.ideaToSendToHelpdesk = idea;
    };

    $scope.sendToHelpdesk = function () {
        $scope.updating = true;
        $scope.ideaRepo.sendToHelpdesk($scope.ideaToSendToHelpdesk).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetIdeas();
                $scope.updating = false;
                $scope.ideaToSendToHelpdesk = {};
            }
        });
    };

    $scope.confirmDelete = function (idea) {
        $scope.resetIdeas();
        $scope.openModal('#deleteIdeaModal');
        $scope.ideaToDelete = idea;
    };

    $scope.deleteIdea = function () {
        $scope.deleting = true;
        $scope.ideaToDelete.delete().then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.closeModal();
                $scope.deleting = false;
                $scope.ideaToDelete = {};
            }
        });
    };

    $scope.elevateIdea = function (idea) {
        $scope.elevating = true;
        FeatureProposalRepo.elevate(idea).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.elevating = false;
                $scope.resetIdeas();
            }
        });
    };

    $scope.confirmElevateMultiple = function (ideas) {
        $scope.resetIdeas();
        $scope.fpData.ideas = ideas;
        $scope.fpData.title = ideas[0].title;
        $scope.fpData.description = ideas[0].description;
        $scope.fpData.service = ideas[0].service;
        $scope.openModal('#elevateMultipleModal');
    };

    $scope.confirmAddIdea = function (idea) {
        $scope.resetIdeas();
        $scope.ideaToAdd = idea;
        $scope.openModal('#confirmAddIdeaModal');
    };

    $scope.addIdea = function (fp) {
        fp.ideas.push($scope.ideaToAdd);
        fp.dirty(true);
        $scope.updateFeatureProposal(fp);
        $scope.closeModal();
        $scope.selectedFp = {};
        $scope.ideaToAdd = {};
    };

    $scope.setSelectedFp = function (fp) {
        $scope.selectedFp = fp;
    };

});
