app.controller('NotificationController', function($controller, $scope, Notification, NotificationRepo) {

  angular.extend(this, $controller('AbstractController', {
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
    });
  };

  $scope.locations = {
    EVANS: 'Evans Library (Main Campus)',
    CUSHING: 'Cushing',
    MSL: 'Medical Sciences Library',
    WCL: 'West Campus Library'
  };
});