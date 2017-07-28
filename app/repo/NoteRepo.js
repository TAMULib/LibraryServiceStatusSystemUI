app.repo("NoteRepo", function NoteRepo($q, WsApi) {

  noteRepo = this;

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
        // noteRepo.empty();
        console.log(page);
        noteRepo.addAll(page.content);
        resolve(page);
      });
    });
    
  };

  return noteRepo;

});