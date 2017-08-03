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
        modelListeners: true,
        all: {
            'endpoint': '/private/queue',
            'controller': 'note',
            'method': 'all'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'note',
        },
        get: {
            'endpoint': '/private/queue',
            'controller': 'note'
        },
        getByService: {
            'endpoint': '/private/queue',
            'controller': 'note',
            'method': 'by-service'
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
        modelListeners: true,
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
    }
}
