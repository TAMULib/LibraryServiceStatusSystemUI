describe('controller: RequestController', function () {

    var controller, scope, User;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.service');
        module('mock.serviceRepo');
        module('mock.storageService');
        module('mock.user');
        //module('mock.userService'); // fixme: mock is breaking here.
        module('mock.wsApi');

        inject(function ($controller, $rootScope, _Service_, _ServiceRepo_, _StorageService_, _User_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            _StorageService_.set('role', 'ROLE_USER');

            controller = $controller('RequestController', {
                $routeParams: {
                    service: 2
                },
                $scope: scope,
                Service: _Service_,
                ServiceRepo: _ServiceRepo_,
                StorageService: _StorageService_,
                User: _User_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            User = _User_;

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
        it('submit should be defined', function () {
            expect(scope.submit).toBeDefined();
            expect(typeof scope.submit).toEqual("function");
        });
        it('reset should be defined', function () {
            expect(scope.reset).toBeDefined();
            expect(typeof scope.reset).toEqual("function");
        });
        it('clear should be defined', function () {
            expect(scope.clear).toBeDefined();
            expect(typeof scope.clear).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('submit should submit a feature request', function () {
            scope.user
            scope.type = 'FEATURE';
            scope.title = 'Test feature request';
            scope.description = 'This is a test feature request on service 1';
            scope.service = 1;
            scope.submit();
        });
        it('submit should submit a issue request', function () {
            scope.type = 'ISSUE';
            scope.title = 'Test issue request';
            scope.description = 'This is a test issue request';
            scope.submit();
        });
        it('reset should reset request', function () {
            scope.type = 'FEATURE';
            scope.title = 'Test feature request';
            scope.description = 'This is a test feature request on service 1';
            scope.service = 1;
            scope.reset();
            expect(scope.type).toEqual();
            expect(scope.title).toEqual();
            expect(scope.description).toEqual();
            expect(scope.service).toEqual(2);
        });
        it('clear should clear request', function () {
            scope.type = 'ISSUE';
            scope.title = 'Test issue request';
            scope.description = 'This is a test issue request';
            scope.clear();
            expect(scope.type).toEqual('ISSUE');
            expect(scope.title).toEqual();
            expect(scope.description).toEqual();
            expect(scope.service).toEqual(2);
        });
    });

});
