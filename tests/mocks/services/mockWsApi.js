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
            case 'products':
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
                                'ArrayList<Product>': mockProducts
                            });
                    }
                } else {
                    var id = apiReq.method;
                    for (var i in mockProducts) {
                        if (mockProducts[i].id == id) {
                            payloadResponse({
                                'Product': mockProducts[i]
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
