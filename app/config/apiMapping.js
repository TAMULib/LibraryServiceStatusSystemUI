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
            'controller': 'user',
            'method': 'credentials'
        },
        all: {
            'endpoint': '/private/queue',
            'controller': 'user',
            'method': 'all'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'user'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'user',
            'method': 'update'
        }
    },
    Note: {
        lazy: true,
        validations: true,
        modelListeners: false,
        listen: {
            'endpoint': '/channel',
            'controller': 'note',
        },
        instantiate: {
            'endpoint': '/private/queue',
            'controller': 'note'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'note',
            'method': 'create'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'note/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'note/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'note/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'note',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'note',
            'method': 'remove'
        },
        page: {
            'endpoint': '/private/queue',
            'controller': 'note',
            'method': 'page'
        }
    },
    Service: {
        validations: true,
        modelListeners: false,
        all: {
            'endpoint': '/private/queue',
            'controller': 'service',
            'method': 'all'
        },
        public: {
            'endpoint': '/private/queue',
            'controller': 'service',
            'method': 'public'
        },
        get: {
            'endpoint': '/private/queue',
            'controller': 'service'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'service',
            'method': 'create'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'service'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'service/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'service/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'service/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'service',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'service',
            'method': 'remove'
        }
    },
    Notification: {
        validations: true,
        modelListeners: false,
        all: {
            'endpoint': '/private/queue',
            'controller': 'notification',
            'method': 'all'
        },
        get: {
            'endpoint': '/private/queue',
            'controller': 'notification'
        },
        create: {
            'endpoint': '/private/queue',
            'controller': 'notification',
            'method': 'create'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'notification'
        },
        createListen: {
            'endpoint': '/channel',
            'controller': 'notification/create'
        },
        updateListen: {
            'endpoint': '/channel',
            'controller': 'notification/update'
        },
        deleteListen: {
            'endpoint': '/channel',
            'controller': 'notification/delete'
        },
        update: {
            'endpoint': '/private/queue',
            'controller': 'notification',
            'method': 'update'
        },
        remove: {
            'endpoint': '/private/queue',
            'controller': 'notification',
            'method': 'remove'
        }
    }
};
