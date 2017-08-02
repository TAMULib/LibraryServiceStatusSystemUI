app.filter('replaceUnderscore', function() {
    return function(text) {
      return text.replace(/_/g, ' ');
    };
});