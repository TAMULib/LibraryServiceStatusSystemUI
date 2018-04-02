app.controller('FeatureProposalController', function ($controller, $scope, FeatureProposal, FeatureProposalRepo, ProjectService) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.tableParams = FeatureProposalRepo.getTableParams();

    $scope.fpToDelete = {};

    $scope.ideaToAdd = {};

    $scope.filters = [{
        gloss: 'Service',
        property: 'service.name'
    },
    {
        gloss: 'Title',
        property: 'title'
    },
    {
        gloss: 'Description',
        property: 'description'
    },
    {
        gloss: 'Submitted',
        property: 'submitted'
    },
    {
        gloss: 'Last Modified',
        property: 'lastModified'
    }
    ];

    $scope.filter = $scope.filters[0];

    $scope.activeFilters = FeatureProposalRepo.getPageSettings().filters;

    var activeSort = FeatureProposalRepo.getPageSettings().sort = [{
        property: 'service.name',
        direction: 'ASC'
    }, {
        property: 'lastModified',
        direction: 'DESC'
    }];

    $scope.selectFilter = function (filter) {
        $scope.filter = filter;
    };

    $scope.removeFilter = function (prop, v) {
        $scope.activeFilters[prop].splice($scope.activeFilters[prop].indexOf(v), 1);
        if ($scope.activeFilters[prop].length === 0) {
            delete $scope.activeFilters[prop];
        }
        FeatureProposalRepo.getTableParams().reload();
    };

    $scope.applyFilter = function (filter) {
        if ($scope.activeFilters[filter.property]) {
            $scope.activeFilters[filter.property].push(filter.value);
        } else {
            $scope.activeFilters[filter.property] = [filter.value];
        }
        FeatureProposalRepo.getTableParams().reload();
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
        FeatureProposalRepo.getTableParams().reload();
    };

    $scope.editFeatureProposal = function (fp) {
        $scope.fpData = fp;
        $scope.openModal('#editFpModal');
    };

    $scope.removeIdea = function (idea) {
        if ($scope.fpData.ideas.some(function (i) {
            return i.id === idea.id;
        })) {
            $scope.fpData.dirty(true);
            $scope.fpData.ideas.splice($scope.fpData.ideas.indexOf(idea), 1);
        }
    };

    $scope.updateFeatureProposal = function (fp) {
        FeatureProposalRepo.update($scope.fpData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetFeatureProposals();
            }
        });
    };

    $scope.select = function (fp, modal) {
        $scope.fpData = fp;
        $scope.openModal(modal);
    };

    $scope.submitFeatureProposal = function (fp) {
        $scope.submitting = true;
        ProjectService.submitFeatureProposal(fp).then(function () {
            $scope.submitting = false;
            $scope.resetFeatureProposals();
        });
    };

    $scope.confirmDelete = function (fp) {
        $scope.openModal('#deleteFpModal');
        $scope.fpToDelete = fp;
    };

    $scope.deleteFp = function () {
        $scope.deleting = true;
        $scope.fpToDelete.delete().then(function () {
            $scope.closeModal();
            $scope.deleting = false;
            $scope.fpToDelete = {};
        });
    };

});