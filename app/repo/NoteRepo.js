app.repo("NoteRepo", function NoteRepo($q, WsApi) {

  noteRepo = this;

  noteRepo.page = function(number, size, direction, properties, filters) {
    console.log(size);
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
      console.log(noteRepo.mapping.page);
      WsApi.fetch(noteRepo.mapping.page).then(function(data) {
        var page = angular.fromJson(data.body).payload.PageImpl;
        console.log(page.content);
        noteRepo.empty();
        noteRepo.addAll(page.content);
        resolve(page);
      });
    });
    
  };

  return noteRepo;

});