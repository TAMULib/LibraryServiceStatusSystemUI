app.directive('weaverTable', function ($controller) {
  return {
      templateUrl: 'views/directives/tableControls.html',
      restrict: 'E',
      replace: false,
      transclude: {
        table: 'weaverTableElement',
        modals: 'weaverTableModals'
      },
      scope: false,
      link: function ($scope, element, attr) {

        if($scope.filters) {

            $scope.filter = $scope.filters[0];

            $scope.activeFilters = $scope.repo.getPageSettings().filters;

            $scope.selectFilter = function(filter) {
                $scope.filter = filter;
            };
            
            $scope.removeFilter = function (prop, v) {
                $scope.activeFilters[prop].splice($scope.activeFilters[prop].indexOf(v), 1);
                if($scope.activeFilters[prop].length === 0) {
                    delete $scope.activeFilters[prop];
                }
                $scope.repo.getTableParams().reload();
            };
            
            $scope.applyFilter = function(filter) {
                if($scope.activeFilters[filter.property]) {
                    $scope.activeFilters[filter.property].push(filter.value);
                } else {
                    $scope.activeFilters[filter.property] = [filter.value];
                }
                $scope.repo.getTableParams().reload();
                delete $scope.filter.value;
            };

            $scope.lookupGloss = function(prop) {
                for(var i in $scope.filters) {
                    var filter = angular.copy($scope.filters[i]);
                    if(filter.property === prop) {
                        return filter.gloss;
                    }
                }
            };

        }

        var activeSort = $scope.repo.getPageSettings().sort = [{
            property: 'service.name',
            direction: 'ASC'
        }, {
            property: 'lastModified',
            direction: 'DESC'
        }];

        $scope.unsorted = function(prop) {
            for(var i in activeSort) {
                var sort = activeSort[i];
                if(sort.property === prop) {
                    return false;
                }
            }
            return true;
        };
        
        $scope.asc = function(prop) {
            for(var i in activeSort) {
                var sort = activeSort[i];
                if(sort.property === prop && sort.direction === 'ASC') {
                    return true;
                }
            }
            return false;
        };
        
        $scope.desc = function(prop) {
            for(var i in activeSort) {
                var sort = activeSort[i];
                if(sort.property === prop && sort.direction === 'DESC') {
                    return true;
                }
            }
            return false;
        };
        
        $scope.toggleSort = function(prop) {
            var asc = true;
            for(var i in activeSort) {
                var sort = activeSort[i];
                if(sort.property === prop) {
                    if(sort.direction === 'ASC') {
                        sort.direction = 'DESC';
                    } else {
                        activeSort.splice(i, 1);
                    }
                    asc = false;
                    break;
                }
            }
            if(asc) {
                activeSort.push({
                    property: prop,
                    direction: 'ASC'
                });
            }
            $scope.repo.getTableParams().reload();
        };

      }
  };
});