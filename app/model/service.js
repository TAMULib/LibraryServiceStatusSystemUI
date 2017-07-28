app.model("Service", function Service(NoteRepo) {

    return function Service() {

      var service = this;
        
        service.before(function() {
          NoteRepo.ready().then(function() {
            console.log(JSON.stringify(service.notes));
            if (service.notes) {
              var noteIds = angular.copy(service.notes);
              console.log(JSON.stringify(noteIds));
              service.notes.length = 0;
              angular.forEach(noteIds, function(noteId){
                var fullNote = NoteRepo.findById(noteId);
                service.notes.push(fullNote);
                console.log(fullNote, noteId);
              });
            }
          });
        });

        return service;
    };

});