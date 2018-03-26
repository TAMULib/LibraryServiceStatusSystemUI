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
        update: {
            'endpoint': '/private/queue',
            'controller': 'users',
            'method': 'update'
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
        }
    }
};