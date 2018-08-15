app.factory('TableFactory', function (NgTableParams) {

    this.buildTable = function (tableConfig) {

        var pageSettings = {
            pageNumber: tableConfig.pageNumber,
            pageSize: tableConfig.pageSize,
            sort: tableConfig.sort,
            filters: tableConfig.filters
        };

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