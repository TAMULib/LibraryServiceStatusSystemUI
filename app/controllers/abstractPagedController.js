app.controller('AbstractPagedController', function ($controller, $scope, $q, FeatureProposal, FeatureProposalRepo, IdeaRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.filtersDeferred = $q.defer();

    $scope.filtersDeferred.promise.then(function() {
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

    $scope.unsorted = function (prop) {
        for (var i in $scope.activeSort) {
            var sort = $scope.activeSort[i];
            if (sort.property === prop) {
                return false;
            }
        }
        return true;
    };


    $scope.asc = function (prop) {
        for (var i in $scope.activeSort) {
            var sort = $scope.activeSort[i];
            if (sort.property === prop && sort.direction === 'ASC') {
                return true;
            }
        }
        return false;
    };

    $scope.desc = function (prop) {
        for (var i in $scope.activeSort) {
            var sort = $scope.activeSort[i];
            if (sort.property === prop && sort.direction === 'DESC') {
                return true;
            }
        }
        return false;
    };

    $scope.toggleSort = function (prop) {
        var asc = true;
        for (var i in $scope.activeSort) {
            var sort = $scope.activeSort[i];
            if (sort.property === prop) {
                if (sort.direction === 'ASC') {
                    sort.direction = 'DESC';
                } else {
                    $scope.activeSort.splice(i, 1);
                }
                asc = false;
                break;
            }
        }
        if (asc) {
            $scope.activeSort.push({
                property: prop,
                direction: 'ASC'
            });
        }
        $scope.repo.getTableParams().reload();
    };

});