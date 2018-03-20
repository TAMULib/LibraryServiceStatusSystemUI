app.service('ProjectService', function($q, WsApi) {

  this.getAll = function (force) {
      var projects = [];
      WsApi.fetch(apiMapping.Project.all).then(function(response) {
        var apiRes = angular.fromJson(response.body);
        if(apiRes.meta.status === 'SUCCESS') {
          ready = true;
          angular.extend(projects, apiRes.payload['ArrayList<ObjectNode>']);
        }
      });
      return projects;
  };

  this.getById = function (id) {
    var project = {};
    angular.extend(apiMapping.Project.getById, {
      'method': id
    });
    WsApi.fetch(apiMapping.Project.getById).then(function(response) {
      var apiRes = angular.fromJson(response.body);
      if(apiRes.meta.status === 'SUCCESS') {
        angular.extend(project, apiRes.payload.ObjectNode);
      }
    });
    return project;
  };

});