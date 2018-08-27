app.filter('ideaState', function (IdeaState) {
    return function (state) {
        return IdeaState[state].value === undefined ? '' : IdeaState[state].gloss;
    };
});