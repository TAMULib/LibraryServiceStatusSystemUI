app.controller('AbstractPagedController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, IdeaRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    if ($scope.filters) {

        $scope.filter = $scope.filters[0];

        $scope.activeFilters = $scope.repo.getPageSettings().filters;

        $scope.selectFilter = function (filter) {
            $scope.filter = filter;
        };

        $scope.removeFilter = function (prop, v) {
            $scope.activeFilters[prop].splice($scope.activeFilters[prop].indexOf(v), 1);
            if ($scope.activeFilters[prop].length === 0) {
                delete $scope.activeFilters[prop];
            }
            $scope.repo.getTableParams().reload();
        };

        $scope.applyFilter = function (filter) {
            if ($scope.activeFilters[filter.property]) {
                $scope.activeFilters[filter.property].push(filter.value);
            } else {
                $scope.activeFilters[filter.property] = [filter.value];
            }
            $scope.repo.getTableParams().reload();
            delete $scope.filter.value;
        };

        $scope.lookupGloss = function (prop) {
            for (var i in $scope.filters) {
                var filter = angular.copy($scope.filters[i]);
                if (filter.property === prop) {
                    return filter.gloss;
                }
            }
        };

    }

});