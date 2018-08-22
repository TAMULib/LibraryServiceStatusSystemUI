app.controller('ServiceDetailFeatureProposalListController', function ($controller, $scope, $timeout, $anchorScroll, FeatureProposalState, FeatureProposalRepo, ServiceRepo, UserRepo) {

    angular.extend(
        this,
        $controller(
            'ServiceDetailController', {
                $scope: $scope
            }
        ),
        $controller(
            'FeatureProposalController', {
                $scope: $scope
            }
        ),
        $controller(
            'AuthenticationController', {
                $scope: $scope
            }
        )
    );

    ServiceRepo.ready().then(function () {
        $scope.featureProposalsTableParams = $scope.service.getListFeatureProposalsTableParams();

        $scope.hasFeatureProposals = function () {
            return $scope.featureProposalsTableParams.data.length > 0;
        };

        $timeout(function () {
            $anchorScroll();
        }, 500);
    });

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
        FeatureProposalRepo.vote(fp).then(function (res) {
            var apiRes = angular.fromJson(res.body);
            if (apiRes.meta.status === 'SUCCESS') {
                $scope.service.getListFeatureProposalsTableParams().reload();
                $scope.service.getManagedFeatureProposalsTableParams().reload();
            }
        });
    };

});