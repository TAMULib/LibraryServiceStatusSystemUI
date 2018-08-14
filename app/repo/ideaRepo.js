app.repo("IdeaRepo", function IdeaRepo($q, WsApi, Idea, ServiceRepo, TableFactory) {

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

    var safePage = function (resolve) {
        ideaRepo.fetchPage().then(function (response) {
            var page = angular.fromJson(response.body).payload.PageImpl;
            ideaRepo.empty();
            ideaRepo.addAll(page.content);
            if (table.getPageSettings().pageNumber > 1 && table.getPageSettings().pageNumber > page.totalPages) {
                table.setPage(page.totalPages);
                safePage(resolve);
            } else {
                resolve(page);
            }
        });
    };

    ideaRepo.page = function () {
        return $q(function (resolve) {
            safePage(resolve);
        });
    };

    var table = TableFactory.buildTable({
        pageNumber: sessionStorage.getItem('ideas-page') ? sessionStorage.getItem('ideas-page') : 1,
        pageSize: sessionStorage.getItem('ideas-size') ? sessionStorage.getItem('ideas-size') : 10,
        direction: 'DESC',
        properties: ['title'],
        filters: {},
        counts: [5, 10, 25, 50, 100],
        page: ideaRepo.page,
        data: ideaRepo.getContents(),
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

    WsApi.listen(ideaRepo.mapping.createListen).then(null, null, function (response) {
        ServiceRepo.addIdea(new Idea(angular.fromJson(response.body).payload.Idea));
        table.getTableParams().reload();
    });

    WsApi.listen(ideaRepo.mapping.updateListen).then(null, null, function (response) {
        var idea = new Idea(angular.fromJson(response.body).payload.Idea);
        ServiceRepo.updateIdea(idea);
        updateIdea(idea);
    });

    WsApi.listen(ideaRepo.mapping.deleteListen).then(null, null, function (response) {
        ServiceRepo.removeIdeaById(angular.fromJson(response.body).payload.Long);
        table.getTableParams().reload();
    });

    return ideaRepo;

});