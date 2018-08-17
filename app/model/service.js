app.model("Service", function Service(Idea, IdeaRepo, IdeaState, FeatureProposal, FeatureProposalRepo, FeatureProposalState, Note, NoteRepo, TableFactory) {

    return function Service() {
        var service = this;

        service.before(function () {
            TableFactory.buildPaging({
                name: 'notes',
                parent: service,
                repo: NoteRepo,
                filters: {
                    initial: {
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
                counts: [5, 10, 25, 50, 100],
                pager: {
                	getPageSettingsName: 'getNotesPageSettings',
                    getTableParamsName: 'getNotesTableParams',
                    getName: 'getNotes'
                }
            });
        });

        service.before(function () {
            TableFactory.buildPaging({
                name: 'ideas',
                parent: service,
                repo: IdeaRepo,
                filters: {
                    initial: {
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
                counts: [5, 10, 25, 50, 100],
                pager: {
                	getPageSettingsName: 'getIdeasPageSettings',
                    getTableParamsName: 'getIdeasTableParams',
                    getName: 'getIdeas'
                }
            });
        });

        service.before(function () {
            TableFactory.buildPaging({
                name: 'featureProposals',
                parent: service,
                repo: FeatureProposalRepo,
                filters: {
                    initial: {
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
                counts: [5, 10, 25, 50, 100],
                pager: {
                	getPageSettingsName: 'getFeatureProposalsPageSettings',
                    getTableParamsName: 'getFeatureProposalsTableParams',
                    getName: 'getFeatureProposals'
                }
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