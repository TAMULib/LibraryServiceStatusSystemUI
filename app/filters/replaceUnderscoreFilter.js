app.filter('replaceUnderscore', function () {
    return function (text) {
        if (text) {
            return text.replace(/_/g, ' ');
        }
    };
});
