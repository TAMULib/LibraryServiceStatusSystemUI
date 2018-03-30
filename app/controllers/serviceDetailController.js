app.controller('ServiceDetailController', function ($controller, $routeParams, $scope, FeatureProposalRepo, ServiceRepo, UserRepo) {

    angular.extend(this, $controller('AppAbstractController', {
        $scope: $scope
    }));

    angular.extend(this, $controller('AuthenticationController', {
        $scope: $scope
    }));


    if (!$scope.isAnonymous()) {
        UserRepo.getUser().then(function(response) {
            var apiRes = angular.fromJson(response.body);
            if(apiRes.meta.status === 'SUCCESS') {
                $scope.user = apiRes.payload.User;
                $scope.hasVoted = function(fp) {
                    return fp.voters.indexOf($scope.user.id) >= 0;
                };
            }
        });
    }

    $scope.activeTab = 'ideas';

    ServiceRepo.ready().then(function () {
        $scope.service = ServiceRepo.findById($routeParams.serviceId);
        $scope.notesTableParams = $scope.service.getNotesTableParams();
        $scope.ideasTableParams = $scope.service.getIdeasTableParams();
        $scope.featureProposalsTableParams = $scope.service.getFeatureProposalsTableParams();
    });

    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
    };

    $scope.vote = function (fp) {
        FeatureProposalRepo.vote(fp);
    };

});