angular.module('mock.wsApi', []).service('WsApi', function ($q) {

    var payloadResponse = function (payload) {
        return {
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS'
                },
                payload: payload
            })
        };
    };

    var messageResponse = function (message) {
        return {
            body: angular.toJson({
                meta: {
                    status: 'SUCCESS',
                    message: message
                }
            })
        };
    };

    this.fetch = function (apiReq) {
        var defer = $q.defer();
        switch (apiReq.controller) {
            case 'projects':
                if (isNaN(apiReq.method)) {
                    switch (apiReq.method) {
                        case 'feature':
                            defer.resolve(messageResponse('Successfully submitted feature request!'));
                            break;
                        case 'issue':
                            defer.resolve(messageResponse('Successfully submitted issue request!'));
                            break;
                        default:
                            defer.resolve(payloadResponse({
                                'ArrayList<Project>': mockProjects
                            }));
                    }
                } else {
                    var id = apiReq.method;
                    for (var i in mockProjects) {
                        if (mockProjects[i].id == id) {
                            defer.resolve(payloadResponse({
                                'Project': mockProjects[i]
                            }));
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
        var defer = $q.defer();
        return defer.promise;
    }

});