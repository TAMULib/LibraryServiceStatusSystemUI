app.repo("UserRepo", function UserRepo(WsApi) {

  var userRepo = this;

  userRepo.getUser = function () {
    return WsApi.fetch(this.mapping.getUser);
  };

  return userRepo;

});
