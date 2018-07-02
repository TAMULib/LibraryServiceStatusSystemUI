describe('controller: ManagementController', function () {

    var appAbstractController, controller, scope;

    beforeEach(module('core'));

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $location, $rootScope, _StorageService_) {
        scope = $rootScope.$new();
        storageService = _StorageService_;
        controller = $controller('ManagementController', {
            $scope: scope,
            StorageService: _StorageService_
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('canManageServices should be defined', function () {
            expect(scope.canManageServices).toBeDefined();
            expect(typeof scope.canManageServices).toEqual("function");
        });
        it('canManageNotes should be defined', function () {
            expect(scope.canManageNotes).toBeDefined();
            expect(typeof scope.canManageNotes).toEqual("function");
        });
        it('canManageIdeas should be defined', function () {
            expect(scope.canManageIdeas).toBeDefined();
            expect(typeof scope.canManageIdeas).toEqual("function");
        });
        it('canManageFeatureProposals should be defined', function () {
            expect(scope.canManageFeatureProposals).toBeDefined();
            expect(typeof scope.canManageFeatureProposals).toEqual("function");
        });
        it('canManageNotifications should be defined', function () {
            expect(scope.canManageNotifications).toBeDefined();
            expect(typeof scope.canManageNotifications).toEqual("function");
        });
        it('canManageUsers should be defined', function () {
            expect(scope.canManageUsers).toBeDefined();
            expect(typeof scope.canManageUsers).toEqual("function");
        });
    });

    describe('Are the scope methods working as expected', function () {
        it('canManageServices should return true for admins and service managers', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.canManageServices()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.canManageServices()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.canManageServices()).toEqual(true);
        });
        it('canManageServices should return false for non-admins and non-service managers', function () {
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.canManageServices()).toEqual(false);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.canManageServices()).toEqual(false);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.canManageServices()).toEqual(false);
            storageService.set('role', 'ROLE_USER');
            expect(scope.canManageServices()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.canManageServices()).toEqual(false);
        });
        it('canManageNotes should return true for managers or admins except notice managers', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.canManageNotes()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.canManageNotes()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.canManageNotes()).toEqual(true);
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.canManageNotes()).toEqual(true);
        });
        it('canManageNotes should return false for notice managers, staff , users, and anonymous', function () {
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.canManageNotes()).toEqual(false);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.canManageNotes()).toEqual(false);
            storageService.set('role', 'ROLE_USER');
            expect(scope.canManageNotes()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.canManageNotes()).toEqual(false);
        });
        it('canManageIdeas should return true for admins and service managers', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.canManageIdeas()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.canManageIdeas()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.canManageIdeas()).toEqual(true);
        });
        it('canManageIdeas should return false for all but admins and service managers', function () {
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_USER');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.canManageIdeas()).toEqual(false);
        });
        it('canManageFeatureProposals should return true for admins and service managers', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.canManageFeatureProposals()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.canManageFeatureProposals()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.canManageFeatureProposals()).toEqual(true);
        });
        it('canManageFeatureProposals should return false for all but admins and service managers', function () {
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_USER');
            expect(scope.canManageIdeas()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.canManageIdeas()).toEqual(false);
        });
        it('canManageNotifications should return true for admins, web managers, and notice managers', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.canManageNotifications()).toEqual(true);
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.canManageNotifications()).toEqual(true);
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.canManageNotifications()).toEqual(true);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.canManageNotifications()).toEqual(true);
        });
        it('canManageNotifications should return false for all but admins, web managers, and notice managers', function () {
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.canManageNotifications()).toEqual(false);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.canManageNotifications()).toEqual(false);
            storageService.set('role', 'ROLE_USER');
            expect(scope.canManageNotifications()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.canManageNotifications()).toEqual(false);
        });
        it('canManageUsers should return true for ROLE_ADMIN', function () {
            storageService.set('role', 'ROLE_ADMIN');
            expect(scope.canManageUsers()).toEqual(true);
        });
        it('canManageUsers should return false for all but ROLE_ADMIN', function () {
            storageService.set('role', 'ROLE_SERVICE_ADMIN');
            expect(scope.canManageUsers()).toEqual(false);
            storageService.set('role', 'ROLE_SERVICE_MANAGER');
            expect(scope.canManageUsers()).toEqual(false);
            storageService.set('role', 'ROLE_WEB_MANAGER');
            expect(scope.canManageUsers()).toEqual(false);
            storageService.set('role', 'ROLE_NOTICE_MANAGER');
            expect(scope.canManageUsers()).toEqual(false);
            storageService.set('role', 'ROLE_STAFF');
            expect(scope.canManageUsers()).toEqual(false);
            storageService.set('role', 'ROLE_USER');
            expect(scope.canManageUsers()).toEqual(false);
            storageService.set('role', 'ROLE_ANONYMOUS');
            expect(scope.canManageUsers()).toEqual(false);
        });
    });

    
    

});