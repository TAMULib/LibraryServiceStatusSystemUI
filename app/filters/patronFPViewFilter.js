app.filter('patronFPView', function () {
    return function (items) {
        if (items !== undefined) {
            return items.filter(function(item) {
                return item.state === 'ACTIVE';
            });
        }
    };
});