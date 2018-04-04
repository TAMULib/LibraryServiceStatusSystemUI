app.repo("UserRepo", function UserRepo(WsApi) {

    this.getUser = function () {
        return WsApi.fetch(this.mapping.getUser);
    };

    return this;

});