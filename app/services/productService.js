app.service('ProductService', function ($q, WsApi) {

    this.getAll = function (force) {
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Product.all).then(function (response) {
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
        angular.extend(apiMapping.Product.getById, {
            'method': id
        });
        return $q(function (resolve, reject) {
            WsApi.fetch(apiMapping.Product.getById).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    resolve(apiRes.payload.Product);
                } else {
                    reject();
                }
            });
        });
    };

    this.submitFeatureProposal = function(fp) {
        angular.extend(apiMapping.Product.submitFeatureProposal, {
            'data': fp
        });
        return WsApi.fetch(apiMapping.Product.submitFeatureProposal);
    };

});
