app.controller('IdeaController', function($controller, $scope, FeatureProposalRepo, Idea, ServiceRepo) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));
    $scope.ideaToDelete = {};

    $scope.weaverTable = {
        repo: $scope.ideaRepo,
        columns: [{
                gloss: 'Service',
                property: 'service.name',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Title',
                property: 'title',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Description',
                property: 'description',
                filterable: true,
                sortable: false
            },
            {
                gloss: 'Last Modified',
                property: 'lastModified',
                filterable: true,
                sortable: true
            },
            {
                gloss: 'Status',
                property: 'state',
                filterable: true,
                sortable: true
            }
        ],
        activeSort: [{
                property: 'service.name',
                direction: 'ASC'
            },
            {
                property: 'lastModified',
                direction: 'DESC'
            }
        ]
    };

    ServiceRepo.ready().then(function() {

        $scope.tableParams = $scope.ideaRepo.getTableParams();

        $scope.resetIdeas = function() {
            $scope.resetForms($scope.ideaData);
            $scope.ideaData = new Idea({
                title: '',
                description: '',
                service: $scope.service ? $scope.service : $scope.services[0]
            });
            $scope.closeModal();
        };

        $scope.resetIdeas();

    });

    $scope.createIdea = function() {
        $scope.creating = true;
        $scope.ideaRepo.create($scope.ideaData).then(function(res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.creating = false;
                $scope.resetIdeas();
            }
        });
    };

    $scope.editIdea = function(idea) {
        $scope.ideaData = idea;
        $scope.openModal('#editIdeaModal');
    };

    $scope.updateIdea = function() {
        $scope.updating = true;
        $scope.ideaRepo.update($scope.ideaData).then(function(res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.updating = false;
                $scope.resetIdeas();
            }
        });
    };

    $scope.confirmDelete = function(idea) {
        $scope.openModal('#deleteIdeaModal');
        $scope.ideaToDelete = idea;
    };

    $scope.deleteIdea = function() {
        $scope.deleting = true;
        $scope.ideaToDelete.delete().then(function() {
            $scope.closeModal();
            $scope.deleting = false;
            $scope.ideaToDelete = {};
        });
    };

    $scope.elevateIdea = function(idea) {
        $scope.elevating = true;
        FeatureProposalRepo.elevate(idea).then(function(res) {
            var apiRes = angular.fromJson(res.body);
            if (apiRes.meta.status === 'SUCCESS') {
                $scope.elevating = false;
                $scope.resetIdeas();
            }
        });
    };

    $scope.setOverallCheckbox = function() {
        var overallCheckbox = angular.element('#overallCheckbox')[0];
        if ($scope.selectedIdeas.length === 0) {
            overallCheckbox.indeterminate = false;
            overallCheckbox.checked = false;
        } else if ($scope.selectedIdeas.length === $scope.ideasTableParams._settings.total) {
            overallCheckbox.indeterminate = false;
            overallCheckbox.checked = true;
        } else {
            overallCheckbox.indeterminate = true;
            overallCheckbox.checked = false;
        }
    };

    $scope.toggleSelectIdea = function(idea) {
        if ($scope.isSelectedIdea(idea)) {
            $scope.removeIdeaFromSelected(idea);
        } else {
            $scope.selectedIdeas.push(idea);
        }
        $scope.setOverallCheckbox();
    };

    $scope.toggleAll = function() {
        if ($scope.overallCheckboxValue || $scope.anyOnPageSelected()) {
            for (var i in $scope.ideasTableParams.data) {
                var ii = $scope.ideasTableParams.data[i];
                if (i !== 'visibleColumnCount' && $scope.isSelectedIdea(ii)) {
                    $scope.removeIdeaFromSelected(ii);
                }
            }
        } else {
            for (var j in $scope.ideasTableParams.data) {
                var ij = $scope.ideasTableParams.data[j];
                if (j !== 'visibleColumnCount' && !$scope.isSelectedIdea(ij)) {
                    $scope.selectedIdeas.push(ij);
                }
            }
        }
        $scope.setOverallCheckbox();
    };

    $scope.anyOnPageSelected = function() {
        var anySelected = false;
        for (var i in $scope.ideasTableParams.data) {
            var idea = $scope.ideasTableParams.data[i];
            if (i !== 'visibleColumnCount' && $scope.isSelectedIdea(idea)) {
                anySelected = true;
                break;
            }
        }
        return anySelected;
    };

    $scope.isSelectedIdea = function(idea) {
        var selected = false;
        for (var i in $scope.selectedIdeas) {
            if (idea.id === $scope.selectedIdeas[i].id) {
                selected = true;
                break;
            }
        }
        return selected;
    };

    $scope.removeIdeaFromSelected = function(idea) {
        for (var i in $scope.selectedIdeas) {
            if (idea.id === $scope.selectedIdeas[i].id) {
                $scope.selectedIdeas.splice(i, 1);
                break;
            }
        }
    };

    $scope.confirmElevateMultiple = function(ideas) {
        $scope.fpData.ideas = ideas;
        $scope.fpData.title = ideas[0].title;
        $scope.fpData.description = ideas[0].description;
        $scope.fpData.service = ideas[0].service;
        $scope.openModal('#elevateMultipleModal');
    };

    $scope.confirmAddIdea = function(idea) {
        $scope.ideaToAdd = idea;
        $scope.openModal('#confirmAddIdeaModal');
    };

    $scope.addIdea = function(fp) {
        fp.ideas.push($scope.ideaToAdd);
        fp.dirty(true);
        $scope.updateFeatureProposal(fp);
        $scope.closeModal();
        $scope.selectedFp = {};
        $scope.ideaToAdd = {};
    };

    $scope.setSelectedFp = function(fp) {
        $scope.selectedFp = fp;
    };

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists textcolor",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | numlist bullist | forecolor backcolor"
    };

});