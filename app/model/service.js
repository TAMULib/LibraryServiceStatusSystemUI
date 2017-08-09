app.model("Service", function Service($location, $q, $timeout, NoteRepo, Note, TableFactory) {

    return function Service() {
        var service = this;

        service.notes = [];

        service.getPageSettings = function () {
            return table.getPageSettings();
        };

        service.getTableParams = function () {
            return table.getTableParams();
        };

        service.fetchNotePage = function () {
            table.getPageSettings().filters = {
                service: [service.id]
            };
            return NoteRepo.getNotesByService(table.getPageSettings());
        };

        service.page = function () {
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
                if (table.getPageSettings().pageNumber > 1 && table.getPageSettings().pageNumber > page.totalPages) {
                    table.setPage(page.totalPages);
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
            table.getPageSettings().pageNumber = 1;
            table.getPageSettings().pageSize = 1000;
            table.getPageSettings().filters = {
                pinned: [pinned],
                active: [active],
                service: [service.id]
            };
            NoteRepo.getNotesByService(table.getPageSettings()).then(function (response) {
                var page = angular.fromJson(response.body).payload.PageImpl;
                var notes = page.content;
                for (var i in notes) {
                    service.notes.push(new Note(notes[i]));
                }
            });
        };

        var pinned = false;

        var table = TableFactory.buildTable({
            pageNumber: $location.search().page ? $location.search().page : 1,
            pageSize: $location.search().size ? $location.search().size : 10,
            direction: 'DESC',
            properties: ['title'],
            filters: {},
            counts: [5, 10, 25, 50, 100],
            page: service.page,
            data: service.notes
        });

        var addAllNotes = function (notes) {
            service.notes.length = 0;
            for (var i in notes) {
                service.notes.push(new Note(notes[i]));
            }
        };

        return service;
    };

});