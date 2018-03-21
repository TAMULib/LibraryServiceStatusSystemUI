angular.module('mock.storageService', []).service('StorageService', function ($q) {

  this.storage = {
    'session': {},
    'local': {}
  };

  this.keys = {
    'session': {},
    'local': {}
  }

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
      console.log(promisedData);
      angular.extend(data, promisedData);
    })
    return data;
  }


  this.delete = function (key, type) {
    type = (type !== undefined) ? type : appConfig.storageType;
    if (this.keys[type][key] !== undefined) {
      this.keys[type][key].notify(null);
    }
    delete this.keys[type][key];
    delete this.storage[type][key];
  }

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