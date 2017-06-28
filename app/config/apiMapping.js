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
	}
}