app.directive('weaverTable', function ($controller) {
    return {
        templateUrl: 'views/directives/tableControls.html',
        restrict: 'E',
        replace: false,
        transclude: {
            table: 'weaverTableElement',
            controls: 'weaverTableControls',
            modals: 'weaverTableModals'
        }
    };
});