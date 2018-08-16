app.model("Service", function Service($q, $timeout, Idea, IdeaRepo, IdeaState, FeatureProposal, FeatureProposalRepo, FeatureProposalState, Note, NoteRepo, TableFactory) {

    return function Service() {
        var service = this;

        service.before(function () {
            TableFactory.buildPaging({
                name: 'notes',
                child: Note,
                repo: NoteRepo,
                filters: {
                    default: {
                        active: ['true'],
                        service: [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            pinned: [pinned],
                            active: [active],
                            service: [service.id]
                        };
                    }
                },
                sessionStorageKeys: {
                    pageNumber: 'service-notes-page',
                    pageSize: 'service-notes-size'
                },
                sorting: {
                    direction: 'DESC',
                    properties: ['title'],
                },
                counts: [5, 10, 25, 50, 100],
                pager: {
                    getPageSettingsName: 'getNotesPageSettings',
                    getTableParamsName: 'getNotesTableParams',
                    featchPageName: 'fetchNotePage',
                    pageName: 'notesPage',
                    getName: 'getNotes'
                },
                parent: service
            });
        });

        service.before(function () {
            TableFactory.buildPaging({
                name: 'ideas',
                child: Idea,
                repo: IdeaRepo,
                filters: {
                    default: {
                        state: [
                            IdeaState.WAITING_ON_REVIEW.value,
                            IdeaState.REJECTED.value,
                            IdeaState.SENT_TO_HELPDESK.value
                        ],
                        service: [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            state: [IdeaState.WAITING_ON_REVIEW.value],
                            service: [service.id]
                        };
                    }
                },
                sessionStorageKeys: {
                    pageNumber: 'service-ideas-page',
                    pageSize: 'service-ideas-size'
                },
                sorting: {
                    direction: 'DESC',
                    properties: ['title'],
                },
                counts: [5, 10, 25, 50, 100],
                pager: {
                    getPageSettingsName: 'getIdeasPageSettings',
                    getTableParamsName: 'getIdeasTableParams',
                    featchPageName: 'fetchIdeaPage',
                    pageName: 'ideasPage',
                    getName: 'getIdeas'
                },
                parent: service
            });
        });

        service.before(function () {
            TableFactory.buildPaging({
                name: 'featureProposals',
                child: FeatureProposal,
                repo: FeatureProposalRepo,
                filters: {
                    default: {
                        state: getStateFilter(),
                        isPrivate: getIsPrivateFilter(),
                        service: [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            state: getStateFilter(),
                            isPrivate: getIsPrivateFilter(),
                            service: [service.id]
                        };
                    }
                },
                sessionStorageKeys: {
                    pageNumber: 'service-feature-proposals-page',
                    pageSize: 'service-feature-proposals-size'
                },
                sorting: {
                    direction: 'DESC',
                    properties: ['title'],
                },
                counts: [5, 10, 25, 50, 100],
                pager: {
                    getPageSettingsName: 'getFeatureProposalsPageSettings',
                    getTableParamsName: 'getFeatureProposalsTableParams',
                    featchPageName: 'fetchFeatureProposalPage',
                    pageName: 'featureProposalsPage',
                    getName: 'getFeatureProposals'
                },
                parent: service
            });
        });

        var hideInProgress = function () {
            return sessionStorage.role === "ROLE_STAFF" || sessionStorage.role === "ROLE_USER" || sessionStorage.role === "ROLE_ANONYMOUS";
        };

        var hideFromPublic = function () {
            return sessionStorage.role === "ROLE_USER" || sessionStorage.role === "ROLE_ANONYMOUS";
        };

        var getStateFilter = function () {
            var stateFilter = [];
            if (hideInProgress()) {
                stateFilter = [
                    FeatureProposalState.ACTIVE.value,
                    FeatureProposalState.SUBMITTED.value,
                    FeatureProposalState.ON_HOLD.value,
                    FeatureProposalState.REJECTED.value
                ];
            }
            return stateFilter;
        };

        var getIsPrivateFilter = function () {
            var visibilityFilter = [];
            if (hideFromPublic()) {
                visibilityFilter = [false];
            }
            return visibilityFilter;
        };


        return service;
    };

});