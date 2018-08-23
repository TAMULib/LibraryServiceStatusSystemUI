describe('controller: NotificationController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.notification');
        module('mock.notificationRepo');

        inject(function ($controller, $rootScope, _Notification_, _NotificationRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('NotificationController', {
                $scope: scope,
                Notification: _Notification_,
                NotificationRepo: _NotificationRepo_,
                NgTableParams: {}
            });

            // ensure that the isReady() is called.
            //scope.$digest();
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

});
