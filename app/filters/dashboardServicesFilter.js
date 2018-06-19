app.filter('dashboardServices', function () {

    var reduceArray = function (arr, condition1, condition2) {
        var resultingArr = [];
        if (condition1) {
            angular.forEach(arr, function (el) {
                if (el[condition2] || el.status === 'DOWN') {
                    resultingArr.push(el);
                }
            });
        } else {
            resultingArr = arr;
        }
        return resultingArr;
    };

    return function (services, options) {
        var shownServices = reduceArray(services, options.showPublic(), "isPublic");
        return reduceArray(shownServices, options.showShortList, "onShortList");
    };

});