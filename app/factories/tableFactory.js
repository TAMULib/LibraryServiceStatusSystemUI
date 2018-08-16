app.factory('TableFactory', function ($q, $timeout, NgTableParams) {

    this.buildPaging = function (pagingConfig) {

        var pager = {};

        var page = function () {
            var pagePromise = $q(function (resolve) {
                $timeout(function () {
                    defaultFetchPage().then(function (response) {
                        resolve(angular.fromJson(response.body).payload.PageImpl);
                    });
                }, 100);
            });
            pagePromise.then(function (page) {
                if (table.getPageSettings().pageNumber > 1 && table.getPageSettings().pageNumber > page.totalPages) {
                    table.setPage(page.totalPages);
                    defaultFetchPage();
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
            name: 'child-' + pagingConfig.name,
            repo: pagingConfig.repo
        });

        pager[pagingConfig.pager.getTableParamsName] = function () {
            return table.getTableParams();
        };

        pager[pagingConfig.pager.getName] = function (pinned, active) {
            table.getPageSettings().pageNumber = 1;
            table.getPageSettings().pageSize = 1000;
            table.getPageSettings().filters = pagingConfig.filters.custom(pinned, active);
            pagingConfig.repo.fetchPage(table.getPageSettings());
        };

        var defaultFetchPage = function () {
            table.getPageSettings().filters = pagingConfig.filters.default;
            return pagingConfig.repo.fetchPage(table.getPageSettings());
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