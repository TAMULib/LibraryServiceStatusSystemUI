app.controller('ServiceDetailIdeaManagementController', function ($controller, $scope, ServiceRepo) {

    angular.extend(
        this,
        $controller(
            'IdeaController',
            { $scope: $scope }
        ),
        $controller(
            'ServiceDetailController',
            { $scope: $scope }
        )
    );

    ServiceRepo.ready().then(function () {
        $scope.ideasTableParams = $scope.service.getIdeasTableParams();
    });

    $scope.setOverallCheckbox = function () {
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

    $scope.toggleSelectIdea = function (idea) {
        if ($scope.isSelectedIdea(idea)) {
            $scope.removeIdeaFromSelected(idea);
        } else {
            $scope.selectedIdeas.push(idea);
        }
        $scope.setOverallCheckbox();
    };

    $scope.toggleAll = function () {
        if ($scope.overallCheckboxValue || $scope.anyOnPageSelected()) {
            for (var i in $scope.ideasTableParams.data) {
                var ii = $scope.ideasTableParams.data[i];
                if ($scope.isSelectedIdea(ii)) {
                    $scope.removeIdeaFromSelected(ii);
                }
            }
        } else {
            for (var j = 0; j < $scope.ideasTableParams.data.length; j++) {
                var ij = $scope.ideasTableParams.data[j];
                if (!$scope.isSelectedIdea(ij)) {
                    $scope.selectedIdeas.push(ij);
                }
            }
        }
        $scope.setOverallCheckbox();
    };

    $scope.anyOnPageSelected = function () {
        var anySelected = false;
        for (var i in $scope.ideasTableParams.data) {
            var idea = $scope.ideasTableParams.data[i];
            if ($scope.isSelectedIdea(idea)) {
                anySelected = true;
                break;
            }
        }
        return anySelected;
    };

    $scope.isSelectedIdea = function (idea) {
        var selected = false;
        for (var i in $scope.selectedIdeas) {
            if (idea.id === $scope.selectedIdeas[i].id) {
                selected = true;
                break;
            }
        }
        return selected;
    };

    $scope.removeIdeaFromSelected = function (idea) {
        for (var i in $scope.selectedIdeas) {
            if (idea.id === $scope.selectedIdeas[i].id) {
                $scope.selectedIdeas.splice(i, 1);
                break;
            }
        }
    };
});