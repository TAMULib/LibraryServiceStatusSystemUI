angular.module('mock.wsApi', []).service('WsApi', function ($q) {

  var WsApi = this;

  var responsify = function (payload) {
    return {
      body: angular.toJson({
        meta: {
          status: 'SUCCESS'
        },
        payload: payload
      })
    };
  };

  WsApi.fetch = function (apiReq) {
    var defer = $q.defer();
    switch (apiReq.controller) {
      case 'projects':
        if (isNaN(apiReq.method)) {
          if (apiReq.data) {} else {
            defer.resolve(responsify({
              'ArrayList<ObjectNode>': mockProjects
            }));
          }
        } else {
          var id = apiReq.method;
          for (var i in mockProjects) {
            if (mockProjects[i].id == id) {
              defer.resolve(responsify({
                'ObjectNode': mockProjects[i]
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

  WsApi.listen = function (apiReq) {
    var defer = $q.defer();
    return defer.promise;
  }

});