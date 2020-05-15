angular.module('mock.productService', []).service('ProductService', function ($q) {

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

    this.storage = {
        'session': {},
        'local': {}
    };

    this.keys = {
        'session': {},
        'local': {}
    };

    this.set = function (key, value, type) {
        type = (type !== undefined) ? type : appConfig.storageType;
        if (this.keys[type][key] === undefined) {
            this.keys[type][key] = $q.defer();
        }
        this.storage[type][key] = value;
        this.keys[type][key].notify(this.storage[type][key]);
    };

    this.get = function (key, type) {
        type = (type !== undefined) ? type : appConfig.storageType;
        return this.storage[type][key];
    };

    this.listen = function (key, type) {
        type = (type !== undefined) ? type : appConfig.storageType;
        if (this.keys[type][key] === undefined) {
            this.keys[type][key] = $q.defer();
        }
        var data = {};
        this.keys[type][key].promise.then(null, null, function (promisedData) {
            angular.extend(data, promisedData);
        })
        return data;
    };

    this.delete = function (key, type) {
        type = (type !== undefined) ? type : appConfig.storageType;
        if (this.keys[type][key] !== undefined) {
            this.keys[type][key].notify(null);
        }
        delete this.keys[type][key];
        delete this.storage[type][key];
    };

    this.getAll = function(force) {
        defer = $q.defer();
        payloadResponse([]);
        return defer.promise;
    }

    this.getById = function(id) {
        defer = $q.defer();
        payloadResponse({});
        return defer.promise;
    }

    this.submitFeatureProposal = function (fp) {
        defer = $q.defer();
        payloadResponse();
        return defer.promise;
    };

    for (var type in {
            'session': '0',
            'local': '1'
        }) {
        for (var key in this.storage[type]) {
            this.keys[type][key] = $q.defer();
            this.keys[type][key].notify(this.storage[type][key]);
            this.set(key, this.storage[type][key], type);
        }
    }
});
