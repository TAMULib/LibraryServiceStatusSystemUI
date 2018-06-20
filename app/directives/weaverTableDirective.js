app.directive('weaverTable', function ($controller) {
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
            defaultSorting: "=",
            repo: "="
        },
        link: function ($scope, element, attr) {
            var activeSort;
            
            if ($scope.defaultSorting === undefined) {
                activeSort = $scope.repo.getPageSettings().sort = [
                    {
                        property: 'service.name',
                        direction: 'ASC'
                    }, {
                        property: 'lastModified',
                        direction: 'DESC'
                    }
                ];
            } else {
                activeSort = $scope.repo.getPageSettings().sort = [$scope.defaultSorting];
                
            }


            $scope.unsorted = function (prop) {
                for (var i in activeSort) {
                    var sort = activeSort[i];
                    if (sort.property === prop) {
                        return false;
                    }
                }
                return true;
            };

            $scope.asc = function (prop) {
                for (var i in activeSort) {
                    var sort = activeSort[i];
                    if (sort.property === prop && sort.direction === 'ASC') {
                        return true;
                    }
                }
                return false;
            };

            $scope.desc = function (prop) {
                for (var i in activeSort) {
                    var sort = activeSort[i];
                    if (sort.property === prop && sort.direction === 'DESC') {
                        return true;
                    }
                }
                return false;
            };

            $scope.toggleSort = function (prop) {
                var asc = true;
                for (var i in activeSort) {
                    var sort = activeSort[i];
                    if (sort.property === prop) {
                        if (sort.direction === 'ASC') {
                            sort.direction = 'DESC';
                        } else {
                            activeSort.splice(i, 1);
                        }
                        asc = false;
                        break;
                    }
                }
                if (asc) {
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