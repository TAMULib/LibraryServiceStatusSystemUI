app.repo("IdeaRepo", function IdeaRepo(WsApi, Idea, ServiceRepo, TableFactory, UserService) {

    var ideaRepo = this;

    ideaRepo.fetchById = function (ideaId) {
        var idea = new Idea();
        angular.extend(ideaRepo.mapping.instantiate, {
            'method': ideaId
        });
        idea.fetch();
        return idea;
    };

    ideaRepo.getPageSettings = function () {
        return table.getPageSettings();
    };

    ideaRepo.getTableParams = function () {
        return table.getTableParams();
    };

    ideaRepo.fetchPage = function (pageSettings) {
        angular.extend(ideaRepo.mapping.page, {
            'data': pageSettings ? pageSettings : table.getPageSettings()
        });
        return WsApi.fetch(ideaRepo.mapping.page);
    };

    ideaRepo.reject = function (idea) {
        angular.extend(ideaRepo.mapping.reject, {
            'data': idea
        });
        return WsApi.fetch(ideaRepo.mapping.reject);
    };

    ideaRepo.sendToHelpdesk = function (idea) {
        angular.extend(ideaRepo.mapping.sendToHelpdesk, {
            'data': idea
        });
        return WsApi.fetch(ideaRepo.mapping.sendToHelpdesk);
    };

    var table = TableFactory.buildTable({
        pageNumber: sessionStorage.getItem('ideas-page') ? sessionStorage.getItem('ideas-page') : 1,
        pageSize: sessionStorage.getItem('ideas-size') ? sessionStorage.getItem('ideas-size') : 10,
        filters: {},
        counts: [5, 10, 25, 50, 100],
        name: 'ideas',
        repo: ideaRepo
    });

    var updateIdea = function (idea) {
        var ideas = ideaRepo.getContents();
        for (var i in ideas) {
            if (ideas[i].id === idea.id) {
                angular.extend(ideas[i], idea);
                return;
            }
        }
    };

    var canAccess = function () {
        var user = UserService.getCurrentUser();
        var access = false;

        if (user.role === undefined || user.role === null || user.anonymous) {
            access = false;
        }
        else if (user.role === 'ROLE_ADMIN') {
            access = true;
        } else if (user.role === 'ROLE_SERVICE_ADMIN') {
            access = true;
        } else if (user.role === 'ROLE_SERVICE_MANAGER') {
            access = true;
        }

        return access;
    };

    UserService.userReady().then(function () {
        if (canAccess()) {

            WsApi.listen(ideaRepo.mapping.createListen).then(null, null, function (response) {
                ServiceRepo.addIdea(new Idea(angular.fromJson(response.body).payload.Idea));
                table.getTableParams().reload();
            });

            WsApi.listen(ideaRepo.mapping.updateListen).then(null, null, function (response) {
                var idea = new Idea(angular.fromJson(response.body).payload.Idea);
                ServiceRepo.updateIdea(idea);
                updateIdea(idea);
                table.getTableParams().reload();
            });

            WsApi.listen(ideaRepo.mapping.deleteListen).then(null, null, function (response) {
                ServiceRepo.removeIdeaById(angular.fromJson(response.body).payload.Long);
                table.getTableParams().reload();
            });
        }
    });

    return ideaRepo;

});
