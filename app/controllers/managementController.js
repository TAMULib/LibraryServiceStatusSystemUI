app.controller('ManagementController', function ($controller, $scope, UserService) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.columns = [];

    $scope.getDefaultManagementTab = function () {
        var columns = getColumns();
        return "management/" + columns[0].path;
    };

    var columns = {
        "services": {
            path: "services",
            view: "services",
            label: "Services"
        },
        "notes": {
            path: "notes",
            view: "notes",
            label: "Notes"
        },
        "ideas": {
            path: "ideas",
            view: "ideas",
            label: "Ideas"
        },
        "featureProposals": {
            path: "feature-proposals",
            view: "featureProposals",
            label: "Feature Proposals"
        },
        "notifications": {
            path: "notifications",
            view: "notifications",
            label: "Notifications"
        },
        "users": {
            path: "users",
            view: "users",
            label: "Users"
        }
    };

    var getColumns = function () {
        var columnDefinitions;
        switch (sessionStorage.role) {
            case "ROLE_ADMIN":
                columnDefinitions = [
                    columns.services,
                    columns.notes,
                    columns.ideas,
                    columns.featureProposals,
                    columns.notifications,
                    columns.users
                ];
                break;
            case "ROLE_SERVICE_ADMIN":
                columnDefinitions = [
                    columns.services,
                    columns.notes,
                    columns.ideas,
                    columns.featureProposals,
                    columns.notifications
                ];
                break;
            case "ROLE_SERVICE_MANAGER":
                columnDefinitions = [
                    columns.services,
                    columns.notes,
                    columns.ideas,
                    columns.featureProposals
                ];
                break;
            case "ROLE_WEB_MANAGER":
                columnDefinitions = [
                    columns.notes,
                    columns.notifications
                ];
                break;
            case "ROLE_NOTICE_MANAGER":
                columnDefinitions = [
                    columns.notifications
                ];
                break;
            default:
                columnDefinitions = [];
                break;
        }
        $scope.columns.length = 0;
        for (var col of columnDefinitions) {
            $scope.columns.push(col);
        }
        return $scope.columns;
    };

    UserService.userReady().then(function () {
        getColumns();
    });

});