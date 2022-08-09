app.controller('NotificationController', function ($controller, $scope, Notification, NotificationRepo, NgTableParams) {

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

    $scope.notificationToDelete = {};

    $scope.resetNotifications = function () {
        if ($scope.notificationData) {
            $scope.notificationData.refresh();
            $scope.notificationData.clearValidationResults();
        }
        for (var key in $scope.forms) {
            if (!$scope.forms[key].$pristine) {
                $scope.forms[key].$setPristine();
            }
        }
        $scope.notificationData = new Notification({
            name: '',
            body: '',
            active: false,
            locations: []
        });
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
        $scope.notificationData = notification;
        $scope.openModal('#editNotificationModal');
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
        $scope.openModal('#deleteNotificationModal');
        $scope.notificationToDelete = notification;
    };

    $scope.deleteNotification = function () {
        $scope.deleting = true;
        $scope.notificationToDelete.delete().then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.closeModal();
                $scope.deleting = false;
                $scope.notificationToDelete = {};
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
        $scope.tableParams.reload();
    });

    $scope.tinymceOptions = {
        selector: 'textarea',
        theme: "modern",
        plugins: "link lists",
        toolbar: "undo redo | formatselect bold italic separator | alignleft aligncenter alignright | numlist bullist | forecolor backcolor",
        relative_urls: false,
        remove_script_host : false,
        convert_urls : true
    };

});
