// CONVENTION: must match model name, case sensitive
var apiMapping = {
	OverallStatusPublic: {
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
	Theme: {
		all: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'all'
		},
		listen: {
			'endpoint': '/channel',
			'controller': 'theme'
		},
		create: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'add-theme'
		},
		remove: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'remove-theme'
		},
		activate: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'activate-theme'
		},
		update: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'update'
		},
		updateThemeProperty: {
			'endpoint': '/private/queue',
			'controller': 'theme',
			'method': 'update-property'
		}
	},
	User: {
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
		validations: true,
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
			'controller': 'note',
			'method': 'get'
		},
		create: {
			'endpoint': '/private/queue',
			'controller': 'note',
			'method': 'create'
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
		}
	},
	Service: {
		validations: true,
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
			'controller': 'service',
			'method': 'get'
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