app.directive('encodeDecode', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function (fromView) {
                return encodeURIComponent(fromView);
            });
            ngModelController.$formatters.push(function (fromModel) {
                return decodeURIComponent(fromModel);
            });
        }
    };
});