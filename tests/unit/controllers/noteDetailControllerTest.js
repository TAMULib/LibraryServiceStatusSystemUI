describe('controller: NoteDetailController', function () {

    var controller, scope, routeParams, NoteRepo;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.note');
        module('mock.noteRepo');

        inject(function ($controller, $rootScope, _Note_, _NoteRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            routeParams = {
                noteId: 123456789
            };
            NoteRepo = _NoteRepo_;
            controller = $controller('NoteDetailController', {
                $scope: scope,
                $routeParams: routeParams,
                Note: _Note_,
                NoteRepo: _NoteRepo_
            });

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
