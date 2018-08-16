app.controller('IdeaManagementController', function ($controller, $scope) {

    angular.extend(
        this,
        $controller(
            'IdeaController',
            { $scope: $scope }
        ),
        $controller(
            'ManagementController',
            { $scope: $scope }
        )
    );

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
            },
            {
                gloss: 'Actions',
                filterable: false,
                sortable: false
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

    $scope.tableParams = $scope.ideaRepo.getTableParams();
});