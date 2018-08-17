app.controller('ServiceDetailFeatureProposalManagementController', function ($controller, $scope, ServiceRepo) {

    angular.extend(
        this,
        $controller(
            'ServiceDetailController', {
                $scope: $scope
            }
        ),
        $controller(
            'FeatureProposalController', {
                $scope: $scope
            }
        )
    );

    $scope.weaverTable = {
        pageSettings: $scope.service.getFeatureProposalsPageSettings(),
        tableParams: $scope.service.getFeatureProposalsTableParams(),
        columns: [{
                gloss: 'Title',
                property: 'title',
                filterable: false,
                sortable: true
            },
            {
                gloss: 'Description',
                property: 'description',
                filterable: false,
                sortable: false
            },
            {
                gloss: 'Votes',
                property: 'votes',
                filterable: false,
                sortable: false,
                isConstant: true
            },
            {
                gloss: 'Status',
                property: 'state',
                filterable: false,
                sortable: true,
                isConstant: true
            },
            {
                gloss: 'Last Modified',
                property: 'lastModified',
                filterable: false,
                sortable: true
            },
            {
                gloss: 'Private',
                property: 'isPrivate',
                filterable: false,
                sortable: true,
                isConstant: true
            },
            {
                gloss: 'Actions',
                filterable: false,
                sortable: false
            }
        ],
        activeSort: []
    };

});