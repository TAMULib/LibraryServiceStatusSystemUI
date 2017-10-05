app.factory('TableFactory', function (NgTableParams) {

    this.buildTable = function (tableConfig) {

        var pageSettings = {
            pageNumber: tableConfig.pageNumber,
            pageSize: tableConfig.pageSize,
            direction: tableConfig.direction,
            properties: tableConfig.properties,
            filters: tableConfig.filters
        };

        var tableParams = new NgTableParams({
            page: pageSettings.pageNumber,
            count: pageSettings.pageSize,
            sorting: {
                name: pageSettings.direction
            },
            filters: {}
        }, {
            counts: tableConfig.counts,
            getData: function (params) {
                table.setPage(params.page());
                table.setSize(params.count());
                return tableConfig.page().then(function (page) {
                    params.total(page.totalElements);
                    angular.element('.ng-table-pager select option[value="' + params.count() + '"]').prop('selected', true);
                    return tableConfig.data;
                });
            }
        });

        var table = {
            getPageSettings: function () {
                return pageSettings;
            },
            getTableParams: function () {
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
