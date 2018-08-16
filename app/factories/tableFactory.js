app.factory('TableFactory', function ($q, $timeout, NgTableParams) {

    this.buildPaging = function (pagingConfig) {

        var items = [];

        var page = function () {
            var pagePromise = $q(function (resolve) {
                $timeout(function () {
                    pagingConfig.parent[pagingConfig.pager.featchPageName]().then(function (response) {
                        resolve(processPageResponse(response));
                    });
                }, 100);
            });
            pagePromise.then(function (page) {
                if (table.getPageSettings().pageNumber > 1 && table.getPageSettings().pageNumber > page.totalPages) {
                    table.setPage(page.totalPages);
                    pagingConfig.parent[pagingConfig.pager.featchPageName]().then(function (response) {
                        processPageResponse(response);
                    });
                }
            });
            return pagePromise;
        };

        var table = this.buildTable({
            pageNumber: sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageNumber) ? sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageNumber) : 1,
            pageSize: sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageSize) ? sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageSize) : 10,
            direction: pagingConfig.sorting.direction ? pagingConfig.sorting.direction : undefined,
            properties: pagingConfig.sorting.properties ? pagingConfig.sorting.properties : [],
            filters: pagingConfig.filters ? pagingConfig.filters : {},
            counts: pagingConfig.counts ? pagingConfig.counts : [5, 10, 25, 50, 100],
            page: page,
            data: items,

            name: 'child-' + pagingConfig.name,
            repo: pagingConfig.repo
        });

        var pager = {
            notes: items,
        };

        pager[pagingConfig.pager.getPageSettingsName] = function () {
            return table.getPageSettings();
        };

        pager[pagingConfig.pager.getTableParamsName] = function () {
            return table.getTableParams();
        };

        pager[pagingConfig.pager.featchPageName] = function () {
            table.getPageSettings().filters = pagingConfig.filters.default;
            return pagingConfig.repo.fetchPage(table.getPageSettings());
        };

        pager[pagingConfig.pager.pageName] = function () {
            return page();
        };

        pager[pagingConfig.pager.getName] = function (pinned, active) {
            pagingConfig.parent.notes.length = 0;
            table.getPageSettings().pageNumber = 1;
            table.getPageSettings().pageSize = 1000;
            table.getPageSettings().filters = pagingConfig.filters.custom(pinned, active);
            pagingConfig.repo.fetchPage(table.getPageSettings()).then(function (response) {
                processPageResponse(response);
            });
        };

        var processPageResponse = function (response) {
            var page = angular.fromJson(response.body).payload.PageImpl;
            items.length = 0;
            for (var i in page.content) {
                items.push(new pagingConfig.child(page.content[i]));
            }
            return page;
        };

        angular.extend(pagingConfig.parent, pager);
    };

    this.buildTable = function (tableConfig) {

        var pageSettings = {
            pageNumber: tableConfig.pageNumber,
            pageSize: tableConfig.pageSize,
            sort: tableConfig.sort,
            filters: tableConfig.filters
        };

        // NOTE: not setting initial sorting and filters on table params

        var tableParams = new NgTableParams({
            page: pageSettings.pageNumber,
            count: pageSettings.pageSize,
            sorting: {},
            filters: {}
        }, {
            counts: tableConfig.counts,
            getData: function (params) {
                table.setPage(params.page());
                table.setSize(params.count());
                return tableConfig.page().then(function (page) {
                    params.total(page.totalElements);
                    tableConfig.repo.empty();
                    tableConfig.repo.addAll(page.content);
                    angular.element('.ng-table-pager select option[value="' + params.count() + '"]').prop('selected', true);
                    return angular.copy(tableConfig.repo.getContents());
                });
            }
        });

        var table = {
            getPageSettings: function () {
                return pageSettings;
            },
            getTableParams: function () {
                tableParams.name = tableConfig.name;
                return tableParams;
            },
            setPage: function (pageNumber) {
                pageSettings.pageNumber = pageNumber;
                tableParams.page(pageSettings.pageNumber);
                sessionStorage.setItem(tableConfig.name + '-page', pageSettings.pageNumber);
            },
            setSize: function (pageSize) {
                pageSettings.pageSize = pageSize;
                sessionStorage.setItem(tableConfig.name + '-size', pageSettings.pageSize);
            }
        };

        return table;
    };

    return this;
});