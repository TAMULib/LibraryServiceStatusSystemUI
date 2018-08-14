// CONVENTION: must match model name, case sensitive
var apiMapping = {
    OverallStatusPublic: {
        modelListeners: true,
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'status',
            'method': 'overall-public'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'status/overall-public'
        }
    },
    OverallStatusFull: {
        modelListeners: true,
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'status',
            'method': 'overall-full'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'status/overall-full'
        }
    },
    User: {
        lazy: true,
        modelListeners: true,
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'users',
            'method': 'credentials'
        },
        all: {
            'endpoint': '/private/queue',
            'controller': 'users'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'users'
        },
        getUser: {
            'endpoint': '/private/queue',
            'controller': 'users',
            'method': 'user'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'users',
            'method': 'update'
        }
    },
    Idea: {
        lazy: true,
        validations: true,
        modelListeners: false,
        listen: {
            'endpoint': '/channel',
            'controller': 'ideas',
        },
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'ideas'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'ideas',
            'method': 'create'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'ideas/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'ideas/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'ideas/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'ideas',
            'method': 'update'
        },
        reject: {
            'endpoint': '/private/queue',
            'controller': 'ideas',
            'method': 'reject'
        },
        sendToHelpdesk: {
            'endpoint': '/private/queue',
            'controller': 'ideas',
            'method': 'helpdesk'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'ideas',
            'method': 'remove'
        },
        page: {
            'endpoint': '/private/queue',
            'controller': 'ideas',
            'method': 'page'
        }
    },
    FeatureProposal: {
        lazy: true,
        validations: true,
        modelListeners: false,
        page: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': 'page'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'feature-proposals',
        },
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals'
        },
        getById: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': ':id/'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': 'create'
        },
        elevate: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': 'elevate'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': 'remove'
        },
        vote: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': ':id/vote'
        },
        reject: {
            'endpoint': '/private/queue',
            'controller': 'feature-proposals',
            'method': ':id/reject'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'feature-proposals/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'feature-proposals/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'feature-proposals/delete'
        }
    },
    Note: {
        lazy: true,
        validations: true,
        modelListeners: false,
        listen: {
            'endpoint': '/channel',
            'controller': 'notes',
        },
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'notes'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'notes',
            'method': 'create'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'notes/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'notes/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'notes/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'notes',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'notes',
            'method': 'remove'
        },
        page: {
            'endpoint': '/private/queue',
            'controller': 'notes',
            'method': 'page'
        }
    },
    Service: {
        validations: true,
        modelListeners: false,
        all: {
            'endpoint': '/private/queue',
            'controller': 'services'
        },
        public: {
            'endpoint': '/private/queue',
            'controller': 'services',
            'method': 'public'
        },
        get: {
            'endpoint': '/private/queue',
            'controller': 'services'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'services',
            'method': 'create'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'services'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'services/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'services/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'services/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'services',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'services',
            'method': 'remove'
        },
        submitRequest: {
            'endpoint': '/private/queue',
            'controller': 'services'
        },
        page: {
            'endpoint': '/private/queue',
            'controller': 'services',
            'method': 'page'
        }
    },
    Notification: {
        validations: true,
        modelListeners: false,
        all: {
            'endpoint': '/private/queue',
            'controller': 'notifications'
        },
        get: {
            'endpoint': '/private/queue',
            'controller': 'notifications'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'notifications',
            'method': 'create'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'notifications'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'notifications/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'notifications/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'notifications/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'notifications',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'notifications',
            'method': 'remove'
        }
    },
    Project: {
        all: {
            'endpoint': '/private/queue',
            'controller': 'projects'
        },
        getById: {
            'endpoint': '/private/queue',
            'controller': 'projects'
        },
        submitFeatureProposal: {
            'endpoint': '/private/queue',
            'controller': 'projects',
            'method': 'feature'
        }
    }
};
