app.controller('NotificationController', function($controller, $scope, Notification, NotificationRepo, NgTableParams) {

  angular.extend(this, $controller('AppAbstractController', {
    $scope: $scope
  }));

  $scope.notificationRepo = NotificationRepo;

  $scope.notifications = NotificationRepo.getAll();

  $scope.forms = {};

  $scope.notificationToDelete = {};

  $scope.resetNotifications = function () {
    if ($scope.notificationData) {
      $scope.notificationData.clearValidationResults();
    }
    for (var key in $scope.forms) {
      if (!$scope.forms[key].$pristine) {
        $scope.forms[key].$setPristine();
      }
    }
    $scope.notificationData = new Notification({
      'name': '',
      'body': '',
      'isActive': false,
      'locations': []
    });
    $scope.closeModal();
    $scope.notificationRepo.reset();
  };

  $scope.resetNotifications();

  $scope.createNotification = function () {
    console.log($scope.notificationData);
    $scope.notificationRepo.create($scope.notificationData).then(function (response) {
      if (angular.fromJson(response.body).meta.type === 'SUCCESS') {
        $scope.resetNotifications();
      }
    });
  };

  $scope.editNotification = function (notification) {
    $scope.notificationData = notification;
    $scope.openModal('#editNotificationModal');
  };

  $scope.updateNotification = function () {
    $scope.notificationRepo.update($scope.notificationData).then(function (response) {
      if (angular.fromJson(response.body).meta.type === 'SUCCESS') {
        $scope.resetNotifications();
      }
    });
  };

  var buildTable = function () {
    $scope.tableParams = new NgTableParams({}, {
      counts: [],
      filterDelay: 0,
      dataset: NotificationRepo.getAll()
    });
  };

  NotificationRepo.ready().then(function () {
    buildTable();
    $scope.tableParams.reload();
  });

  $scope.confirmDelete = function (notification) {
    $scope.openModal('#deleteNotificationModal');
    $scope.notificationToDelete = notification;
  };

  $scope.deleteNotification = function () {
    $scope.deleting = true;
    $scope.notificationToDelete.delete().then(function () {
      $scope.closeModal();
      $scope.deleting = false;
      NotificationRepo.remove($scope.notificationToDelete);
      $scope.notificationToDelete = {};
      $scope.tableParams.reload();
    });
  };

  $scope.locations = {
    EVANS: 'Evans Library (Main Campus)',
    CUSHING: 'Cushing',
    MSL: 'Medical Sciences Library',
    WCL: 'West Campus Library'
  };
});