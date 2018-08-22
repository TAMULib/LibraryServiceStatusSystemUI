app.model("Service", function Service(Idea, IdeaRepo, IdeaState, FeatureProposal, FeatureProposalRepo, FeatureProposalState, Note, NoteRepo, TableFactory) {

    return function Service() {
        var service = this;

        service.before(function () {
            TableFactory.buildSubResourcePaging({
                name: 'notes',
                parent: service,
                repo: NoteRepo,
                filters: {
                    initial: {
                        active: ['true'],
                        'service.id': [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            pinned: [pinned],
                            active: [active],
                            'service.id': [service.id]
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
            TableFactory.buildSubResourcePaging({
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
                        'service.id': [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            state: [IdeaState.WAITING_ON_REVIEW.value],
                            'service.id': [service.id]
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
            TableFactory.buildSubResourcePaging({
                name: 'managedFeatureProposals',
                parent: service,
                repo: FeatureProposalRepo,
                filters: {
                    initial: {
                        isPrivate: getIsPrivateFilter(),
                        'service.id': [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            isPrivate: getIsPrivateFilter(),
                            'service.id': [service.id]
                        };
                    }
                },
                sessionStorageKeys: {
                    pageNumber: 'service-managed-feature-proposals-page',
                    pageSize: 'service-managed-feature-proposals-size'
                },
                counts: [5, 10, 25, 50, 100],
                pager: {
                    getPageSettingsName: 'getManagedFeatureProposalsPageSettings',
                    getTableParamsName: 'getManagedFeatureProposalsTableParams',
                    getName: 'getManagedFeatureProposals'
                }
            });
        });

        service.before(function () {
            TableFactory.buildSubResourcePaging({
                name: 'listFeatureProposals',
                parent: service,
                repo: FeatureProposalRepo,
                filters: {
                    initial: {
                        state: [
                            FeatureProposalState.ACTIVE.value
                        ],
                        isPrivate: getIsPrivateFilter(),
                        'service.id': [service.id]
                    },
                    custom: function (pinned, active) {
                        return {
                            state: [
                                FeatureProposalState.ACTIVE.value
                            ],
                            isPrivate: getIsPrivateFilter(),
                            'service.id': [service.id]
                        };
                    }
                },
                sessionStorageKeys: {
                    pageNumber: 'service-list-feature-proposals-page',
                    pageSize: 'service-list-feature-proposals-size'
                },
                counts: [5, 10, 25, 50, 100],
                pager: {
                    getPageSettingsName: 'getListFeatureProposalsPageSettings',
                    getTableParamsName: 'getListFeatureProposalsTableParams',
                    getName: 'getListFeatureProposals'
                }
            });
        });

        var hideFromPublic = function () {
            return sessionStorage.role === "ROLE_USER" || sessionStorage.role === "ROLE_ANONYMOUS";
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