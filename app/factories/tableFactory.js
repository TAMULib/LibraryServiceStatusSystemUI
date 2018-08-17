app.factory('TableFactory', function ($q, $timeout, NgTableParams) {

    this.buildPaging = function (pagingConfig) {

        var pager = {};

        var table = this.buildTable({
            pageNumber: sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageNumber) ? sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageNumber) : 1,
            pageSize: sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageSize) ? sessionStorage.getItem(pagingConfig.sessionStorageKeys.pageSize) : 10,
            filters: pagingConfig.filters.initial ? pagingConfig.filters.initial : {},
            counts: pagingConfig.counts ? pagingConfig.counts : [5, 10, 25, 50, 100],
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

        angular.extend(pagingConfig.parent, pager);
    };

    this.buildTable = function (tableConfig) {

        var pageSettings = {
            pageNumber: tableConfig.pageNumber,
            pageSize: tableConfig.pageSize,
            sort: tableConfig.sort,
            filters: tableConfig.filters
        };

        var safePage = function (resolve) {
            tableConfig.repo.fetchPage(pageSettings).then(function (response) {
                var apiRes = angular.fromJson(response.body);
                if (apiRes.meta.status === 'SUCCESS') {
                    var page = apiRes.payload.PageImpl;
                    if (pageSettings.pageNumber > 1 && pageSettings.pageNumber > page.totalPages) {
                        table.setPage(page.totalPages);
                        safePage(resolve);
                    } else {
                        tableConfig.repo.empty();
                        tableConfig.repo.addAll(page.content);
                        angular.extend(page, {
                            content: tableConfig.repo.getContents()
                        });
                        resolve(page);
                    }
                } else {
                    console.warn(apiRes.meta);
                }
            });
        };

        var fetchPage = function () {
            return $q(function (resolve) {
                safePage(resolve);
            });
        };

        var tableParams = new NgTableParams({
            page: pageSettings.pageNumber,
            count: pageSettings.pageSize,
            sorting: {},
            filters: {}
        }, {
            counts: tableConfig.counts ? tableConfig.counts : [5, 10, 25, 50, 100],
            getData: function (params) {
                table.setPage(params.page());
                table.setSize(params.count());
                return fetchPage().then(function (page) {
                    params.total(page.totalElements);
                    angular.element('.ng-table-pager select option[value="' + params.count() + '"]').prop('selected', true);
                    return angular.copy(page.content);
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