app.controller('IdeaController', function ($controller, $scope, FeatureProposalRepo, Idea, IdeaRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.ideaRepo = IdeaRepo;

    $scope.services = ServiceRepo.getAll();

    $scope.modalData = {
        title: '',
        description: '',
    };

    $scope.forms = {};

    $scope.ideaToDelete = {};

    $scope.filters = [
        {
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
            gloss: 'Last Modified',
            property: 'lastModified'
        }
    ];

    $scope.filter = $scope.filters[0];

    $scope.activeFilters = IdeaRepo.getPageSettings().filters;

    var activeSort = IdeaRepo.getPageSettings().sort = [{
        property: 'service.name',
        direction: 'ASC'
    }, {
        property: 'lastModified',
        direction: 'DESC'
    }];
    
    $scope.selectFilter = function(filter) {
        $scope.filter = filter;
    };

    $scope.removeFilter = function (prop, v) {
        $scope.activeFilters[prop].splice($scope.activeFilters[prop].indexOf(v), 1);
        if($scope.activeFilters[prop].length === 0) {
            delete $scope.activeFilters[prop];
        }
        IdeaRepo.getTableParams().reload();
    };

    $scope.applyFilter = function(filter) {
        if($scope.activeFilters[filter.property]) {
            $scope.activeFilters[filter.property].push(filter.value);
        } else {
            $scope.activeFilters[filter.property] = [filter.value];
        }
        IdeaRepo.getTableParams().reload();
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
        IdeaRepo.getTableParams().reload();
    };

    ServiceRepo.ready().then(function () {

        $scope.tableParams = IdeaRepo.getTableParams();

        $scope.resetIdeas = function () {
            if ($scope.ideaData) {
                $scope.ideaData.refresh();
                $scope.ideaData.clearValidationResults();
            }
            for (var key in $scope.forms) {
                if (!$scope.forms[key].$pristine) {
                    $scope.forms[key].$setPristine();
                    $scope.forms[key].$setUntouched();
                }
            }
            $scope.ideaData = new Idea({
                title: '',
                description: '',
                service: $scope.services[0]
            });
            $scope.closeModal();
        };

    });

    $scope.resetIdeas = function () {
        $scope.resetForms($scope.ideaData);
        $scope.ideaData = new Idea({
            title: '',
            description: '',
            service: $scope.services[0]
        });
        $scope.closeModal();
    };

    $scope.resetIdeas();
    
    $scope.createIdea = function () {
        IdeaRepo.create($scope.ideaData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetIdeas();
            }
        });
    };

    $scope.editIdea = function (idea) {
        $scope.ideaData = idea;
        $scope.openModal('#editIdeaModal');
    };

    $scope.updateIdea = function () {
        IdeaRepo.update($scope.ideaData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetIdeas();
            }
        });
    };

    $scope.confirmDelete = function (idea) {
        $scope.openModal('#deleteIdeaModal');
        $scope.ideaToDelete = idea;
    };

    $scope.deleteIdea = function () {
        $scope.deleting = true;
        $scope.ideaToDelete.delete().then(function () {
            $scope.closeModal();
            $scope.deleting = false;
            $scope.ideaToDelete = {};
        });
    };

    $scope.confirmElevate = function (idea) {
        $scope.ideaToElevate = idea;
        $scope.openModal('#elevateIdeaModal');
    };

    $scope.elevateIdea = function (idea) {
        FeatureProposalRepo.elevate(idea).then(function(res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetIdeas();
            }
        });
    };

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists textcolor",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | numlist bullist | forecolor backcolor"
    };

});