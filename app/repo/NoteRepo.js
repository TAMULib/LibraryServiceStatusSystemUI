app.repo("NoteRepo", function NoteRepo($q, WsApi, Note, ServiceRepo) {

  noteRepo = this;

  noteRepo.fetchAndAddById = function(id) {
    angular.extend(noteRepo.mapping.get, {'method': 'get/' + id});

    return $q(function(resolve) {
      var note = noteRepo.findById(id);

      if (note === undefined || note === null) {
        WsApi.fetch(noteRepo.mapping.get).then(function(data) {
          resolve(angular.fromJson(data.body).payload.Note);
         });
      } else {
        resolve(note);
      }
    });
  };

  noteRepo.removeAndUpdateService = function (modelToRemove) {
    
    var service = ServiceRepo.findById(modelToRemove.service.id);
    console.log(modelToRemove);
    noteRepo.remove(modelToRemove);
    service.removeNote(modelToRemove);
    console.log(service);
  };

  noteRepo.page = function(number, size, direction, properties, filters) {
    return $q(function(resolve) {
      if (!properties) {
        properties = 'title';
      }
      if (!direction) {
        direction = 'ASC';
      }
      angular.extend(noteRepo.mapping.page, {
        'data': {
          'page': {
            'number': number,
            'size': size 
          },
          'direction': {
            'properties': properties,
            'direction': direction
          },
          'filters': filters
        }
      });
      WsApi.fetch(noteRepo.mapping.page).then(function(data) {
        var page = angular.fromJson(data.body).payload.PageImpl;
        noteRepo.addAll(page.content);
        resolve(page);
      });
    });
    
  };

  return noteRepo;

});