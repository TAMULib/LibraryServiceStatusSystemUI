describe('controller: NotificationController', function () {

    var controller, q, scope, Notification, NotificationRepo;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.ngTableParams');
        module('mock.notification');
        module('mock.notificationRepo');

        inject(function ($controller, $q, $rootScope, _NgTableParams_, _Notification_, _NotificationRepo_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            controller = $controller('NotificationController', {
                $scope: scope,
                NgTableParams: _NgTableParams_,
                Notification: _Notification_,
                NotificationRepo: _NotificationRepo_
            });

            Notification = _Notification_;
            NotificationRepo = _NotificationRepo_;

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('resetNotifications should be defined', function () {
            expect(scope.resetNotifications).toBeDefined();
            expect(typeof scope.resetNotifications).toEqual("function");
        });
        it('createNotification should be defined', function () {
            expect(scope.createNotification).toBeDefined();
            expect(typeof scope.createNotification).toEqual("function");
        });
        it('editNotification should be defined', function () {
            expect(scope.editNotification).toBeDefined();
            expect(typeof scope.editNotification).toEqual("function");
        });
        it('updateNotification should be defined', function () {
            expect(scope.updateNotification).toBeDefined();
            expect(typeof scope.updateNotification).toEqual("function");
        });
        it('confirmDelete should be defined', function () {
            expect(scope.confirmDelete).toBeDefined();
            expect(typeof scope.confirmDelete).toEqual("function");
        });
        it('deleteNotification should be defined', function () {
            expect(scope.deleteNotification).toBeDefined();
            expect(typeof scope.deleteNotification).toEqual("function");
        });
        it('editSchedule should be defined', function () {
            expect(scope.editSchedule).toBeDefined();
            expect(typeof scope.editSchedule).toEqual("function");
        });
        it('resetSchedule should be defined', function () {
            expect(scope.resetSchedule).toBeDefined();
            expect(typeof scope.resetSchedule).toEqual("function");
        });
    });

    describe('Are the scope methods working as expected', function () {
        it('resetNotifications should reset notifications', function () {
            var notification = new Notification();
            scope.notificationData = notification;
            scope.closeModal = function() {};

            spyOn(scope, 'closeModal');

            scope.resetNotifications();
            scope.$digest();

            expect(scope.closeModal).toHaveBeenCalled();
            expect(scope.ideaData).not.toEqual(null);

            // notification data now has an object and can be tested.
            // save the notification because scope.notificationData is overwritten, which would break any spy.
            notification = scope.notificationData;
            spyOn(notification, 'refresh');
            spyOn(notification, 'clearValidationResults');

            scope.resetNotifications();

            expect(notification.refresh).toHaveBeenCalled();
            expect(notification.clearValidationResults).toHaveBeenCalled();
        });
        it('createNotification should create a notification', function () {
            var notification = new Notification();
            notification.title = "New Notification";
            scope.notificationData = notification;

            spyOn(notification, 'refresh');
            spyOn(notification, 'clearValidationResults');

            scope.createNotification();
            scope.$digest();

            expect(notification.refresh).toHaveBeenCalled();
            expect(notification.clearValidationResults).toHaveBeenCalled();
        });
        it('editNotification should open a modal', function () {
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editNotification(mockNotification1);
            scope.$digest();

            expect(scope.openModal).toHaveBeenCalled();
        });

        it('updateNotification should update a notification', function () {
            var notification = new Notification();
            var deferred;
            notification.mock(mockNotification1);

            deferred = q.defer();
            spyOn(scope.notificationRepo, 'update').and.returnValue(deferred.promise);
            scope.updateNotification();
            deferred.resolve();

            expect(scope.notificationRepo.update).toHaveBeenCalled();
        });
        it('confirmDelete should should open a modal', function () {
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmDelete(mockNotification1);
            scope.$digest();

            expect(scope.openModal).toHaveBeenCalled();
        });
        it('deleteNotification should delete a notification', function () {
            scope.deleting = null;
            scope.notificationToDelete = new Notification();
            scope.notificationToDelete.mock(mockNotification1);

            var deferred = q.defer();
            spyOn(scope.notificationToDelete, 'delete').and.returnValue(deferred.promise);
            scope.deleteNotification();
            deferred.resolve();

            // todo: more work needs to be done, this should be testig for deleting toBe(false).
            expect(scope.deleting).toBeTruthy();
            expect(scope.notificationToDelete.delete).toHaveBeenCalled();
        });
        it('editSchedule should open a modal', function () {
            scope.data = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editSchedule(mockNotification1);

            expect(scope.data).toEqual(mockNotification1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('resetSchedule should reset notifications', function () {
            spyOn(scope, 'resetNotifications');

            scope.resetSchedule();

            expect(scope.resetNotifications).toHaveBeenCalled();
        });
    });

});
