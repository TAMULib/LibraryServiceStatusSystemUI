app.filter('decode', function () {
    return function (text) {
        return decodeURIComponent(text);
    };
});
