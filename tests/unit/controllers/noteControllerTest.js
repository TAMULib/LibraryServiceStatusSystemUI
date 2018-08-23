describe('controller: NoteController', function () {

    var controller, q, scope, Note, Service;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.note');
        module('mock.noteRepo');
        module('mock.service');
        module('mock.serviceRepo');

        inject(function ($controller, $q, $rootScope, _Note_, _NoteRepo_, _Service_, _ServiceRepo_) {
            installPromiseMatchers();
            q = $q;
            scope = $rootScope.$new();

            controller = $controller('NoteController', {
                $scope: scope,
                Note: _Note_,
                NoteRepo: _NoteRepo_,
                ServiceRepo: _ServiceRepo_
            });

            Note = _Note_;
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
        it('createNote should be defined', function () {
            expect(scope.createNote).toBeDefined();
            expect(typeof scope.createNote).toEqual("function");
        });
        it('editNote should be defined', function () {
            expect(scope.editNote).toBeDefined();
            expect(typeof scope.editNote).toEqual("function");
        });
        it('updateNote should be defined', function () {
            expect(scope.updateNote).toBeDefined();
            expect(typeof scope.updateNote).toEqual("function");
        });
        it('editSchedule should be defined', function () {
            expect(scope.editSchedule).toBeDefined();
            expect(typeof scope.editSchedule).toEqual("function");
        });
        it('resetSchedule should be defined', function () {
            expect(scope.resetSchedule).toBeDefined();
            expect(typeof scope.resetSchedule).toEqual("function");
        });
        it('confirmDelete should be defined', function () {
            expect(scope.confirmDelete).toBeDefined();
            expect(typeof scope.confirmDelete).toEqual("function");
        });
        it('deleteNote should be defined', function () {
            expect(scope.deleteNote).toBeDefined();
            expect(typeof scope.deleteNote).toEqual("function");
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
        it('createNote should create a note', function () {
            var note = new Note();
            note.title = "New Note";
            scope.noteData = note;

            spyOn(note, 'refresh');
            spyOn(note, 'clearValidationResults');

            scope.createNote();
            scope.$digest();

            expect(note.refresh).toHaveBeenCalled();
            expect(note.clearValidationResults).toHaveBeenCalled();
        });
        it('editNote should open a modal', function () {
            scope.noteData = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editNote(mockNote1);

            expect(scope.noteData).toEqual(mockNote1);
            expect(scope.openModal).toHaveBeenCalled();
        });

        it('updateNote should update a note', function () {
            var note = new Note();
            var deferred;
            note.mock(mockNote1);

            deferred = q.defer();
            spyOn(scope.noteRepo, 'update').and.returnValue(deferred.promise);
            scope.updateNote();
            deferred.resolve();

            expect(scope.noteRepo.update).toHaveBeenCalled();
        });
        it('editSchedule should open a modal', function () {
            scope.data = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.editSchedule(mockNote1);

            expect(scope.data).toEqual(mockNote1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('resetSchedule should reset notes', function () {
            spyOn(scope, 'resetNotes');

            scope.resetSchedule();

            expect(scope.resetNotes).toHaveBeenCalled();
        });
        it('confirmDelete should open a modal', function () {
            scope.noteToDelete = null;
            scope.openModal = function(name) { };

            spyOn(scope, 'openModal');

            scope.confirmDelete(mockNote1);

            expect(scope.noteToDelete).toEqual(mockNote1);
            expect(scope.openModal).toHaveBeenCalled();
        });
        it('deleteNote should delete a note', function () {
            scope.deleting = null;
            scope.noteToDelete = new Note();
            scope.noteToDelete.mock(mockNote1);

            var deferred = q.defer();
            spyOn(scope.noteToDelete, 'delete').and.returnValue(deferred.promise);
            scope.deleteNote();
            deferred.resolve();

            // todo: more work needs to be done, this should be testig for deleting toBe(false).
            expect(scope.deleting).toBeTruthy();
            expect(scope.noteToDelete.delete).toHaveBeenCalled();
        });
    });

});
