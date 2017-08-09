app.repo("NotificationRepo", function NotificationRepo(WsApi) {

  var notificationRepo = this;

  WsApi.listen(notificationRepo.mapping.createListen).then(null, null, function (response) {
    notificationRepo.add(angular.fromJson(response.body).payload.Notification);
  });

  WsApi.listen(notificationRepo.mapping.updateListen).then(null, null, function (response) {
    var updatedNotification = angular.fromJson(response.body).payload.Notification;
    var notification = notificationRepo.findById(updatedNotification.id);
    angular.extend(notification, updatedNotification);
  });

  WsApi.listen(notificationRepo.mapping.deleteListen).then(null, null, function (response) {
    notificationRepo.remove(notificationRepo.findById(angular.fromJson(response.body).payload.Long));
  });

  return notificationRepo;
});