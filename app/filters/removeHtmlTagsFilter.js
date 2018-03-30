app.filter('removeHtmlTags', function () {
    return function (text) {
        return text.replace(/<[^>]*>/g, '');
    };
});