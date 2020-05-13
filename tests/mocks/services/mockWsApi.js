angular.module('mock.wsApi', []).service('WsApi', function ($q) {

    var defer;

    var payloadResponse = function (payload) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS'
                },
                payload: payload
            })
        });
    };

    var messageResponse = function (message) {
        return defer.resolve({
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS',
                    message: message
                }
            })
        });
    };

    this.fetch = function (apiReq) {
        defer = $q.defer();
        switch (apiReq.controller) {
            case 'projects':
                if (isNaN(apiReq.method)) {
                    switch (apiReq.method) {
                        case 'feature':
                            messageResponse('Successfully submitted feature request!');
                            break;
                        case 'issue':
                            messageResponse('Successfully submitted issue request!');
                            break;
                        default:
                            payloadResponse({
                                'ArrayList<Product>': mockProjects
                            });
                    }
                } else {
                    var id = apiReq.method;
                    for (var i in mockProjects) {
                        if (mockProjects[i].id == id) {
                            payloadResponse({
                                'Project': mockProjects[i]
                            });
                            break;
                        }
                    }
                }
                break;
            default:
        }
        return defer.promise;
    }

    this.listen = function (apiReq) {
        defer = $q.defer();
        return defer.promise;
    }

});
