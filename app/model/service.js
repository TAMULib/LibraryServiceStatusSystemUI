app.model("Service", function Service(NoteRepo) {

    return function Service() {

      var service = this;
        
        this.before(function() {
          NoteRepo.ready().then(function() {
            if (service.notes) {
              var notes = [];
              service.notes.forEach(function(note) {
                notes.push(NoteRepo.findById(note));
              });
              service.notes = notes;
            }
          });
        });

        return service;
    };

});