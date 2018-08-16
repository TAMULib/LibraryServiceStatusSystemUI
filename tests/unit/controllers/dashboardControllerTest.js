describe('controller: DashboardController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.user');
        module('mock.serviceRepo');
        module('mock.noteRepo');
        module('mock.userService');
        module('mock.overallStatusFull');
        module('mock.overallStatusPublic');

        inject(function ($controller, $rootScope, _User_, _UserService_, _NoteRepo_, _OverallStatusFull_, _OverallStatusPublic_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('DashboardController', {
                $scope: scope,
                User: _User_,
                UserService: _UserService_,
                NoteRepo: _NoteRepo_,
                OverallStatusFull: _OverallStatusFull_,
                OverallStatusPublic: _OverallStatusPublic_,
                ServiceRepo: _ServiceRepo_
            });
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('showPublic should be defined', function () {
            expect(scope.showPublic).toBeDefined();
            expect(typeof scope.showPublic).toEqual("function");
        });
        it('showHideShortList should be defined', function () {
            expect(scope.showHideShortList).toBeDefined();
            expect(typeof scope.showHideShortList).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('showPublic should return a boolean.', function () {
            expect(typeof scope.showPublic()).toEqual("boolean");
        });
        it('showHideShortList should toggle the short list boolean.', function () {
          var before = scope.showShortList;
          expect(typeof before).toEqual("boolean");

          scope.showHideShortList();
          var after = scope.showShortList;
          expect(typeof before).toEqual("boolean");

          var notBefore = !before;
          expect(notBefore === after).toBeTruthy();
        });
    });

});
