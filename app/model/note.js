app.model("Note", function Note(Service, ServiceRepo) {

    return function Note() {

      // // var note = this;
        
      // var instantiateService = function() {
      //   console.log("instantiate");
      //   this.service = ServiceRepo.findById(this.service);
      // };

      // this.before(function() {
      //   instantiateService();
      // });

      // this.listen(function() {
      //   instantiateService();
      // });

      return this;
    };

});