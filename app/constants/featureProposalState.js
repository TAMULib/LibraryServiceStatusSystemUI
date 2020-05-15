app.constant("FeatureProposalState", {
    IN_PROGRESS: {
        gloss: "In Progress",
        value: "IN_PROGRESS",
        summary: "Still being drafted, hidden from others, no voting."
    },
    ACTIVE: {
        gloss: "Active",
        value: "ACTIVE",
        summary: "Open for voting by those logged in, displayed to all users."
    },
    SUBMITTED: {
        gloss: "Submitted",
        value: "SUBMITTED",
        summary: "Sent off to product management API."
    },
    ON_HOLD: {
        gloss: "On Hold",
        value: "ON_HOLD",
        summary: "Closed for voting, but not sent to product management API. \"There may be hope\"."
    },
    REJECTED: {
        gloss: "Rejected",
        value: "REJECTED",
        summary: "Closed for voting, terminal state."
    }
});
