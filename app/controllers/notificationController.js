app.controller('NotificationController', function ($controller, $scope, $timeout, Notification, NotificationRepo, NgTableParams) {

    angular.extend(this, $controller('AbstractScheduleController', {
        $scope: $scope
    }));

    $scope.locations = {
        MAIN: 'Main Campus Libraries',
        EVANS: 'Evans/Annex',
        CUSHING: 'Cushing',
        MSL: 'Medical Sciences Library',
        WCL: 'West Campus Library',
        PSEL: 'Policy Sciences & Economics Library',
        QATAR: 'Qatar Library',
        SCHOLARS: 'SCHOLARS@TAMU',
        HELPDESK: 'Library Helpdesk'
    };

    $scope.modalData = {
        title: "Edit",
        type: "notification"
    };

    $scope.notificationRepo = NotificationRepo;

    $scope.notifications = NotificationRepo.getAll();

    $scope.forms = {};

    var emptyNotification = {
        name: '',
        body: '',
        active: false,
        locations: []
    };

    $scope.notificationToDelete = new Notification(emptyNotification);

    $scope.notificationData = new Notification(emptyNotification);

    $scope.resetNotifications = function () {
        $scope.notificationData.refresh();
        $scope.notificationData.clearValidationResults();

        for (var key in $scope.forms) {
            if (!$scope.forms[key].$pristine) {
                $scope.forms[key].$setPristine();
            }
        }
        Object.assign($scope.notificationData, emptyNotification);
        $scope.closeModal();
    };

    $scope.resetNotifications();

    $scope.createNotification = function () {
        NotificationRepo.create($scope.notificationData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetNotifications();
            }
        });
    };

    $scope.editNotification = function (notification) {
        Object.assign($scope.notificationData, notification);
        $timeout(function () {
            $scope.openModal('#editNotificationModal');
            const modal = angular.element('#editNotificationModal');
            if (modal) {
                const iframe = modal.find("iframe");
                if (iframe && iframe.length >= 1) {
                    iframe[0].contentDocument.body.innerHTML = notification.body;
                }
            }
        });
    };

    $scope.updateNotification = function () {
        $scope.notificationData.dirty(true);
        NotificationRepo.update($scope.notificationData).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetNotifications();
            }
        });
    };

    $scope.confirmDelete = function (notification) {
        Object.assign($scope.notificationToDelete, notification);
        $timeout(function() {
            $scope.openModal('#deleteNotificationModal');
        });
    };

    $scope.deleteNotification = function () {
        $scope.deleting = true;
        $scope.notificationToDelete.delete().then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.closeModal();
                $scope.deleting = false;
                Object.assign($scope.notificationToDelete, emptyNotification);
                $scope.tableParams.reload();
            }
        });
    };

    $scope.editSchedule = function (notification) {
        $scope.data = notification;
        $scope.openModal('#editScheduleModal');
    };

    $scope.resetSchedule = function () {
        $scope.resetNotifications();
    };

    var buildTable = function () {
        var allNotifications = NotificationRepo.getAll();
        $scope.tableParams = new NgTableParams({
            count: allNotifications.length
        }, {
            counts: [],
            filterDelay: 0,
            dataset: allNotifications
        });
    };

    NotificationRepo.ready().then(function () {
        buildTable();

        document.addEventListener("contentSave", function (e) {
            $scope.notificationData.body = e.detail.data;
            $scope.save();
        });

        $scope.save = function () {
            $scope.notificationData.body = encodeURIComponent($scope.notificationData.body);
            $scope.notificationData.update($scope.notificationData);
            $scope.notificationData.body = decodeURIComponent($scope.notificationData.body);
        };

        $scope.tableParams.reload();
    });

});
