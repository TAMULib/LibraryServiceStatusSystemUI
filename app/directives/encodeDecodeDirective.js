app.directive('encodeDecode', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function(fromView) {
        console.log("fromView", fromView);
        return encodeURIComponent(fromView);
      });

      ngModelController.$formatters.push(function(fromModel) {
        console.log(decodeURIComponent(fromModel));
        return decodeURIComponent(fromModel);
      });
    }
  };
});