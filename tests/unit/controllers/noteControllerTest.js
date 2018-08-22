describe('controller: NoteController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.note');
        module('mock.noteRepo');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Note_, _NoteRepo_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('NoteController', {
                $scope: scope,
                Note: _Note_,
                NoteRepo: _NoteRepo_,
                ServiceRepo: _ServiceRepo_
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
