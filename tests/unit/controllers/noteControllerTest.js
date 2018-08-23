describe('controller: NoteController', function () {

    var controller, scope, Service;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.note');
        module('mock.noteRepo');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($controller, $rootScope, _Note_, _NoteRepo_, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('NoteController', {
                $scope: scope,
                Note: _Note_,
                NoteRepo: _NoteRepo_,
                ServiceRepo: _ServiceRepo_
            });

            Service = _Service_;

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
        it('resetNotes should be defined', function () {
            expect(scope.resetNotes).toBeDefined();
            expect(typeof scope.resetNotes).toEqual("function");
        });
        it('resetNotes should be defined', function () {
            expect(scope.resetNotes).toBeDefined();
            expect(typeof scope.resetNotes).toEqual("function");
        });
    });
    describe('Are the scope methods working as expected', function () {
        it('resetNotes should reset notes', function () {
            var note;
            var service = new Service();
            service.mock(mockService1);
            scope.service = service;
            scope.noteData = null;
            scope.closeModal = function() {};

            spyOn(scope, 'closeModal');

            scope.resetNotes();

            expect(scope.closeModal).toHaveBeenCalled();
            expect(scope.ideaData).not.toEqual(null);

            // note data now has an object and can be tested.
            // save the note because scope.noteData is overwritten, which would break any spy.
            note = scope.noteData;
            spyOn(note, 'refresh');
            spyOn(note, 'clearValidationResults');

            scope.resetNotes();

            expect(note.refresh).toHaveBeenCalled();
            expect(note.clearValidationResults).toHaveBeenCalled();
        });
    });

});
