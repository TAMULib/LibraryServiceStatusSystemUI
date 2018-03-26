app.model("Service", function Service($q, $timeout, Idea, IdeaRepo, Note, NoteRepo, TableFactory) {

    return function Service() {
        var service = this;

        service.notes = [];

        service.getNotesPageSettings = function () {
            return notesTable.getPageSettings();
        };

        service.getNotesTableParams = function () {
            return notesTable.getTableParams();
        };

        service.fetchNotePage = function () {
            notesTable.getPageSettings().filters = {
                active: [true],
                service: [service.id]
            };
            return NoteRepo.fetchPage(notesTable.getPageSettings());
        };

        service.notesPage = function () {
            var pagePromise = $q(function (resolve) {
                $timeout(function () {
                    service.fetchNotePage().then(function (response) {
                        var page = angular.fromJson(response.body).payload.PageImpl;
                        addAllNotes(page.content);
                        resolve(page);
                    });
                }, 100);
            });
            pagePromise.then(function (page) {
                if (notesTable.getPageSettings().pageNumber > 1 && notesTable.getPageSettings().pageNumber > page.totalPages) {
                    notesTable.setPage(page.totalPages);
                    service.fetchNotePage().then(function (response) {
                        var page = angular.fromJson(response.body).payload.PageImpl;
                        addAllNotes(page.content);
                    });
                }
            });
            return pagePromise;
        };

        service.getNotes = function (pinned, active) {
            service.notes.length = 0;
            notesTable.getPageSettings().pageNumber = 1;
            notesTable.getPageSettings().pageSize = 1000;
            notesTable.getPageSettings().filters = {
                pinned: [pinned],
                active: [active],
                service: [service.id]
            };
            NoteRepo.fetchPage(notesTable.getPageSettings()).then(function (response) {
                var page = angular.fromJson(response.body).payload.PageImpl;
                var notes = page.content;
                for (var i in notes) {
                    service.notes.push(new Note(notes[i]));
                }
            });
        };

        var notesTable = TableFactory.buildTable({
            pageNumber: sessionStorage.getItem('service-notes-page') ? sessionStorage.getItem('service-notes-page') : 1,
            pageSize: sessionStorage.getItem('service-notes-size') ? sessionStorage.getItem('service-notes-size') : 10,
            direction: 'DESC',
            properties: ['title'],
            filters: {},
            counts: [5, 10, 25, 50, 100],
            page: service.notesPage,
            data: service.notes,
            name: 'service-notes'
        });

        var addAllNotes = function (notes) {
            service.notes.length = 0;
            for (var i in notes) {
                service.notes.push(new Note(notes[i]));
            }
        };


        service.ideas = [];

        service.getIdeasPageSettings = function () {
            return ideasTable.getPageSettings();
        };

        service.getIdeasTableParams = function () {
            return ideasTable.getTableParams();
        };

        service.fetchIdeaPage = function () {
            ideasTable.getPageSettings().filters = {
                service: [service.id]
            };
            return IdeaRepo.fetchPage(ideasTable.getPageSettings());
        };

        service.ideasPage = function () {
            var pagePromise = $q(function (resolve) {
                $timeout(function () {
                    service.fetchIdeaPage().then(function (response) {
                        var page = angular.fromJson(response.body).payload.PageImpl;
                        addAllIdeas(page.content);
                        resolve(page);
                    });
                }, 100);
            });
            pagePromise.then(function (page) {
                if (ideasTable.getPageSettings().pageNumber > 1 && ideasTable.getPageSettings().pageNumber > page.totalPages) {
                    ideasTable.setPage(page.totalPages);
                    service.fetchIdeaPage().then(function (response) {
                        var page = angular.fromJson(response.body).payload.PageImpl;
                        addAllIdeas(page.content);
                    });
                }
            });
            return pagePromise;
        };

        service.getIdeas = function () {
            service.ideas.length = 0;
            ideasTable.getPageSettings().pageNumber = 1;
            ideasTable.getPageSettings().pageSize = 1000;
            ideasTable.getPageSettings().filters = {
                service: [service.id]
            };
            IdeaRepo.fetchPage(ideasTable.getPageSettings()).then(function (response) {
                var page = angular.fromJson(response.body).payload.PageImpl;
                var ideas = page.content;
                for (var i in ideas) {
                    service.ideas.push(new Idea(ideas[i]));
                }
            });
        };

        var ideasTable = TableFactory.buildTable({
            pageNumber: sessionStorage.getItem('service-ideas-page') ? sessionStorage.getItem('service-ideas-page') : 1,
            pageSize: sessionStorage.getItem('service-ideas-size') ? sessionStorage.getItem('service-ideas-size') : 10,
            direction: 'DESC',
            properties: ['title'],
            filters: {},
            counts: [5, 10, 25, 50, 100],
            page: service.ideasPage,
            data: service.ideas,
            name: 'service-ideas'
        });

        var addAllIdeas = function (ideas) {
            service.ideas.length = 0;
            for (var i in ideas) {
                service.ideas.push(new Idea(ideas[i]));
            }
        };

        return service;
    };

});