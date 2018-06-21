app.directive('weaverTable', function () {
  return {
      templateUrl: 'views/directives/tableControls.html',
      restrict: 'E',
      replace: false,
      transclude: {
        table: 'weaverTableElement',
        controls: 'weaverTableControls',
        modals: 'weaverTableModals'
      },
      scope: {
        repo: "=",
        weaverTableConfig: "="
      },
      controller: ['$scope', function weaverTableController($scope) {

        $scope.repo.getPageSettings().sort = [];

            if($scope.weaverTableConfig.properties) {

                $scope.filters = $scope.weaverTableConfig.properties.map(prop => {
                    if (prop.filterable) {
                        return {
                            gloss: prop.gloss,
                            property: prop.property
                        };
                    }
                });

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

            var activeSort = $scope.repo.getPageSettings().sort = $scope.weaverTableConfig.activeSort;

            this.unsorted = function(prop) {
                for(var i in activeSort) {
                    var sort = activeSort[i];
                    if(sort.property === prop) {
                        return false;
                    }
                }
                return true;
            };

            this.asc = function(prop) {
                for(var i in activeSort) {
                    var sort = activeSort[i];
                    if(sort.property === prop && sort.direction === 'ASC') {
                        return true;
                    }
                }
                return false;
            };

            this.desc = function(prop) {
                for(var i in activeSort) {
                    var sort = activeSort[i];
                    if(sort.property === prop && sort.direction === 'DESC') {
                        return true;
                    }
                }
                return false;
            };

            this.toggleSort = function(prop) {
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

            if (activeSort) {

                if ($scope.weaverTableConfig.properties) {
                    var result = {};
                    $scope.weaverTableConfig.properties.map(prop => {
                        if (prop.sortable) {
                            result[prop.property] = prop.gloss;
                        }
                    });
                    this.sortable = result;
                }
            }
        }]
    };
});

app.directive('thContents', function () {
    return {
        templateUrl: 'views/directives/thContents.html',
        restrict: 'E',
        replace: true,
        require: '^^weaverTable',
        scope: {
            property: '@'
        },
        link: function ($scope, element, attr, parent) {
            $scope.toggleSort = parent.toggleSort;
            $scope.unsorted = parent.unsorted;
            $scope.asc = parent.asc;
            $scope.desc = parent.desc;
            $scope.sortable = parent.sortable;
        }
    };
});