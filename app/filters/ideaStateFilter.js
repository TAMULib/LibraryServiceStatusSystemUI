app.filter('ideaState', function (IdeaState) {
    return function (state) {
        return IdeaState[state] === undefined ? '' : IdeaState[state];
    };
});