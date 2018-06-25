describe('controller: AppAbstractController', function () {

    var controller, scope;

    beforeEach(module('core'));

    beforeEach(module('app'));

    beforeEach(module('mock.user'));

    beforeEach(inject(function ($controller, $location, $rootScope, _StorageService_, _User_, _UserService_) {
        scope = $rootScope.$new();
        storageService = _StorageService_;
        controller = $controller('AppAbstractController', {
            $scope: scope,
            StorageService: _StorageService_,
            User: _User_,
            UserService: _UserService_
        });
        installPromiseMatchers();
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('hasAdminAccess should be defined', function () {
            expect(scope.hasAdminAccess).toBeDefined();
            expect(typeof scope.hasAdminAccess).toEqual("function");
        });
        it('hasManagementAccess should be defined', function () {
            expect(scope.hasManagementAccess).toBeDefined();
            expect(typeof scope.hasManagementAccess).toEqual("function");
        });
        it('isServiceAdmin should be defined', function () {
            expect(scope.isServiceAdmin).toBeDefined();
            expect(typeof scope.isServiceAdmin).toEqual("function");
        });
        it('isWebManager should be defined', function () {
            expect(scope.isWebManager).toBeDefined();
            expect(typeof scope.isWebManager).toEqual("function");
        });
        it('isServiceManager should be defined', function () {
            expect(scope.isServiceManager).toBeDefined();
            expect(typeof scope.isServiceManager).toEqual("function");
        });
        it('isNoticeManager should be defined', function () {
            expect(scope.isNoticeManager).toBeDefined();
            expect(typeof scope.isNoticeManager).toEqual("function");
        });
        it('isStaff should be defined', function () {
            expect(scope.isStaff).toBeDefined();
            expect(typeof scope.isStaff).toEqual("function");
        });
        it('isFullServiceConsumer should be defined', function () {
            expect(scope.isFullServiceConsumer).toBeDefined();
            expect(typeof scope.isFullServiceConsumer).toEqual("function");
        });
    });

    describe('Are the scope methods defined', function () {
        it('hasAdminAccess should return true for admins', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.hasAdminAccess()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.hasAdminAccess()).toEqual(true);
        });
        it('hasAdminAccess should return false for non-admins', function () {
            storageService.set('role', 'ROLE_USER');
            expect(scope.hasAdminAccess()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.hasAdminAccess()).toEqual(false);
        });
        it('hasManagementAccess should return true for managers or admins', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.hasManagementAccess()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.hasManagementAccess()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.hasManagementAccess()).toEqual(true);
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.hasManagementAccess()).toEqual(true);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.hasManagementAccess()).toEqual(true);
        });
        it('isServiceAdmin should return true for service admins', function () {
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.isServiceAdmin()).toEqual(true);
            storageService.set('role', 'ROLE_USER');
            expect(scope.isServiceAdmin()).toEqual(false);
        });
        it('isWebManager should return true for web managers', function () {
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.isWebManager()).toEqual(true);
            storageService.set('role', 'ROLE_USER');
            expect(scope.isServiceAdmin()).toEqual(false);
        });
        it('isServiceManager should return true for service managers', function () {
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.isServiceManager()).toEqual(true);
            storageService.set('role', 'ROLE_USER');
            expect(scope.isServiceAdmin()).toEqual(false);
        });
        it('isNoticeManager should return true for notice managers', function () {
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.isNoticeManager()).toEqual(true);
            storageService.set('role', 'ROLE_USER');
            expect(scope.isServiceAdmin()).toEqual(false);
        });
        it('isStaff should return true for staff', function () {
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.isStaff()).toEqual(true);
            storageService.set('role', 'ROLE_USER');
            expect(scope.isServiceAdmin()).toEqual(false);
        });
        it('isFullServiceConsumer should return true for anyone but anonymous or users', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.isFullServiceConsumer()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.isFullServiceConsumer()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.isFullServiceConsumer()).toEqual(true);
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.isFullServiceConsumer()).toEqual(true);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.isFullServiceConsumer()).toEqual(true);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.isFullServiceConsumer()).toEqual(true);
            storageService.set('role', 'ROLE_USER');
            expect(scope.isServiceAdmin()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.isServiceAdmin()).toEqual(false);
        });
    });

    
    

});