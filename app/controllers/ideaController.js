app.controller('IdeaController', function ($controller, $scope, $timeout, FeatureProposalRepo, Idea, IdeaRepo, ServiceRepo) {

    angular.extend(this, $controller('AbstractIdeaController', {
        $scope: $scope
    }));

    $scope.repo = IdeaRepo;

    $scope.ideaToDelete = {};

    $scope.selectedIdeas = [];

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

    ServiceRepo.ready().then(function () {

        $scope.tableParams = IdeaRepo.getTableParams();

        $scope.resetIdeas = function () {
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
        FeatureProposalRepo.elevate(idea).then(function (res) {
            var apiRes = angular.fromJson(res.body);
            if (apiRes.meta.status === 'SUCCESS') {
                $scope.resetIdeas();
            }
        });
    };

    $scope.setOverallCheckbox = function () {
        var overallCheckbox = angular.element('#overallCheckbox')[0];
        var unchecked = 0;
        angular.forEach($scope.ideasTableParams.data, function(idea) {
            if ($scope.selectedIdeas.some(function(checkIdea) {
                return idea.id === checkIdea.id;
            })) {
                unchecked++;
            }
        });
        if (unchecked === $scope.ideasTableParams.data.length) {
            $scope.overallCheckboxValue = true;
            overallCheckbox.indeterminate = false;
        } else if (unchecked === 0) {
            $scope.overallCheckboxValue = false;
            overallCheckbox.indeterminate = false;
        } else {
            $scope.overallCheckboxValue = false;
            overallCheckbox.indeterminate = true;
        }
    };

    $scope.toggleSelectIdea = function(idea) {
        var foundIdea = $scope.selectedIdeas.some(function(i) {
            return i.id === idea.id;
        });
        if (foundIdea) {
            $scope.selectedIdeas.splice($scope.selectedIdeas.indexOf(idea), 1);
        } else {
            $scope.selectedIdeas.push(idea);
        }
        $scope.setOverallCheckbox();
    };

    $scope.toggleAll = function() {
        var checkboxes = angular.element('.idea-checkbox');

        if ($scope.overallCheckboxValue) {
            $timeout(function() {
                angular.forEach(checkboxes, function(elem) {
                    elem.click();
                });
            });
        } else {
            $timeout(function() {
                angular.forEach(checkboxes, function(elem) {
                    if (!elem.checked) {
                        elem.click();
                    }
                });
            });
        }
    };

    $scope.confimrElevateMultiple = function(ideas) {
        $scope.fpData.ideas = ideas;
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