app.controller('ServiceDetailFeatureProposalListController', function ($controller, $scope, FeatureProposalState, FeatureProposalRepo, UserRepo) {

    angular.extend(
        this,
        $controller(
            'ServiceDetailController', 
            { $scope: $scope }
        ),
        $controller(
            'FeatureProposalController',
            { $scope: $scope }
        ),
        $controller(
            'AuthenticationController',
            { $scope: $scope }
        )
    );

    if (!$scope.isAnonymous()) {
        UserRepo.getUser().then(function (res) {
            var apiRes = angular.fromJson(res.body);
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

    $scope.vote = function (fp) {
        FeatureProposalRepo.vote(fp);
    };

});