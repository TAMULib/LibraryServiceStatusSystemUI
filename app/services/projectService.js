app.service('ProjectService', function ($q, WsApi) {

    this.getAll = function (force) {
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Project.all).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload['ArrayList<Project>']);
                } else {
                    reject();
                }
            });
        });
    };

    this.getById = function (id) {
        angular.extend(apiMapping.Project.getById, {
            'method': id
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Project.getById).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload.Project);
                } else {
                    reject();
                }
            });
        });
    };

    this.submitRequest = function (request) {
        angular.extend(apiMapping.Project.submitRequest, {
            'method': request.type === 'FEATURE' ? 'feature' : 'issue',
            'data': request
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Project.submitRequest).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.meta.message);
                } else {
                    reject();
                }
            });
        });
    };

});