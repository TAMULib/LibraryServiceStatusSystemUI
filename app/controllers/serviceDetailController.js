app.controller('ServiceDetailController', function ($controller, $anchorScroll, $routeParams, $scope, $timeout, FeatureProposalState, FeatureProposalRepo, ServiceRepo, UserRepo) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    angular.extend(this, $controller('AuthenticationController', {
        $scope: $scope
    }));

    if (!$scope.isAnonymous()) {
        UserRepo.getUser().then(function (response) {
            var apiRes = angular.fromJson(response.body);
            if (apiRes.meta.status === 'SUCCESS') {
                $scope.user = apiRes.payload.User;
                $scope.hasVoted = function (fp) {
                    return fp.voters.indexOf($scope.user.id) >= 0;
                };
            }
        });
    }

    $scope.isVotingOpen = function (featureProposal) {
        return !$scope.isAnonymous() && featureProposal.state === FeatureProposalState.ACTIVE.value;
    };

    $scope.activeTab = 'ideas';

    $scope.serviceDisabled = true;

    ServiceRepo.ready().then(function () {
        $scope.service = ServiceRepo.findById($routeParams.serviceId);

        $scope.notesTableParams = $scope.service.getNotesTableParams();
        $scope.ideasTableParams = $scope.service.getIdeasTableParams();
        $scope.featureProposalsTableParams = $scope.service.getFeatureProposalsTableParams();

        $timeout(function () {
            $anchorScroll();
        }, 500);

        $scope.hasFeatureProposals = function () {
            return $scope.featureProposalsTableParams.data.length > 0;
        };

    });

    $scope.setActiveTab = function (tab) {
        $scope.activeTab = tab;
    };

    $scope.vote = function (fp) {
        FeatureProposalRepo.vote(fp);
    };

    $scope.getServiceWebsite = function (service) {
        var link = service.website;
        if (link.indexOf('//') === -1) {
            link = '//' + link;
        }
        return link;
    };

});
