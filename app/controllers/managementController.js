app.controller('ManagementController', function ($controller, $scope, UserService) {
    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

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

    $scope.user = UserService.getCurrentUser();

    $scope.columns = [];

    if ($scope.user.role == "ROLE_ADMIN") {
        $scope.columns = [
            columns.services,
            columns.notes,
            columns.ideas,
            columns.featureProposals,
            columns.notifications,
            columns.users
        ];
    }
    else if ($scope.user.role == "ROLE_SERVICE_ADMIN") {
        $scope.columns = [
            columns.services,
            columns.notes,
            columns.ideas,
            columns.featureProposals,
            columns.notifications
        ];
    }
    else if ($scope.user.role == "ROLE_SERVICE_MANAGER") {
        $scope.columns = [
            columns.services,
            columns.notes,
            columns.ideas,
            columns.featureProposals,
        ];
    }
    else if ($scope.user.role == "ROLE_WEB_MANAGER") {
        $scope.columns = [
            columns.notes,
            columns.notifications
        ];
    }
    else if ($scope.user.role == "ROLE_NOTICE_MANAGER") {
        $scope.columns = [
            columns.notifications
        ];
    }
});
