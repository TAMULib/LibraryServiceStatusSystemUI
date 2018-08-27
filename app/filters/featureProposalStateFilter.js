app.filter("featureProposalState", function (FeatureProposalState) {
    return function (state) {
        return FeatureProposalState[state].value === undefined ? "" : FeatureProposalState[state].gloss;
    };
});