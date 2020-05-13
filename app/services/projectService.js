app.service('ProjectService', function ($q, WsApi) {

    this.getAll = function (force) {
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Project.all).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload['ArrayList<Product>']);
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

    this.submitFeatureProposal = function(fp) {
        angular.extend(apiMapping.Project.submitFeatureProposal, {
            'data': fp
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Project.submitFeatureProposal).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    };

});
