app.filter('dashboardServices', function () {

    var reduceArray = function (arr, condition1, condition2) {
        var resultingArr = [];
        if (condition1) {
            angular.forEach(arr, function (el) {
                if (el[condition2]) {
                    resultingArr.push(el);
                }
            });
        } else {
            resultingArr = arr;
        }
        return resultingArr;
    };

    var filterByStatus = function (arr, filterStatus) {
      var filtered = [];
      var remaining = [];

      angular.forEach(arr, function (el) {
          if (el.status === filterStatus) {
            filtered.push(el);
          }
          else {
            remaining.push(el);
          }
        });

      return {
        'filtered': filtered,
        'remaining': remaining
      };
    };

    return function (services, options) {
        var shownServices = reduceArray(services, options.showPublic(), "isPublic");
        var byStatus = filterByStatus(shownServices, "MAINTENANCE");
        var shortList = reduceArray(byStatus.remaining, options.showShortList, "onShortList");
        return byStatus.filtered.concat(shortList);
    };

});
