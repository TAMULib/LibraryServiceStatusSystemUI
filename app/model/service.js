app.model("Service", function Service($q, Note, NoteRepo) {

    return function Service() {

      var service = this;
        
      service.before(function() {
        
        if (service.notes.length > 0) {

          var notePromises = []

          for(var i in service.notes) {
            var noteId = service.notes[i];
            notePromises.push($q(function(resolve) { 
              NoteRepo.fetchAndAddById(noteId).then(function(note) {
                resolve(new Note(note));
              });
            }));
          }

          $q.all(notePromises).then(function(serviceNotes) {
            angular.extend(service, {
              notes: serviceNotes
            });
          });
        }

      });

      return service;
    };

});