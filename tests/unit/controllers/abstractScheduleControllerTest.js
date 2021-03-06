describe('controller: AbstractScheduleController', function () {

    var controller, q, scope, Schedule;

    beforeEach(function() {
        module('core');
        module('app');
        module('mock.schedule');

        inject(function ($controller, $rootScope, $q, _Schedule_) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            q = $q;

            controller = $controller('AbstractScheduleController', {
                $scope: scope
            });

            Schedule = _Schedule_;

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
        it('reset should be defined', function () {
            expect(scope.reset).toBeDefined();
            expect(typeof scope.reset).toEqual("function");
        });
        it('cancel should be defined', function () {
            expect(scope.cancel).toBeDefined();
            expect(typeof scope.cancel).toEqual("function");
        });
        it('openStart should be defined', function () {
            expect(scope.openStart).toBeDefined();
            expect(typeof scope.openStart).toEqual("function");
        });
        it('openEnd should be defined', function () {
            expect(scope.openEnd).toBeDefined();
            expect(typeof scope.openEnd).toEqual("function");
        });
        it('addSchedule should be defined', function () {
            expect(scope.addSchedule).toBeDefined();
            expect(typeof scope.addSchedule).toEqual("function");
        });
        it('isNew should be defined', function () {
            expect(scope.isNew).toBeDefined();
            expect(typeof scope.isNew).toEqual("function");
        });
        it('updateSchedule should be defined', function () {
            expect(scope.updateSchedule).toBeDefined();
            expect(typeof scope.updateSchedule).toEqual("function");
        });
        it('confirmSchedule should be defined', function () {
            expect(scope.confirmSchedule).toBeDefined();
            expect(typeof scope.confirmSchedule).toEqual("function");
        });
        it('cancelSchedule should be defined', function () {
            expect(scope.cancelSchedule).toBeDefined();
            expect(typeof scope.cancelSchedule).toEqual("function");
        });
        it('invalidSchedule should be defined', function () {
            expect(scope.invalidSchedule).toBeDefined();
            expect(typeof scope.invalidSchedule).toEqual("function");
        });
        it('isValid should be defined', function () {
            expect(scope.isValid).toBeDefined();
            expect(typeof scope.isValid).toEqual("function");
        });
        it('removeSchedule should be defined', function () {
            expect(scope.removeSchedule).toBeDefined();
            expect(typeof scope.removeSchedule).toEqual("function");
        });
        it('saveSchedule should be defined', function () {
            expect(scope.saveSchedule).toBeDefined();
            expect(typeof scope.saveSchedule).toEqual("function");
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('reset should recreate the schedule', function () {
            scope.schedule = null;
            scope.editing = null;

            scope.reset();
            expect(scope.editing).toBe(false);
            expect(scope.schedule.scheduleData.nextStatus).toEqual("DOWN");
        });
        it('cancel should cancel the schedule', function () {
            scope.changed = null;
            scope.cancel();
            expect(scope.changed).toBe(false);
        });
        it('openStart should perform popup event', function () {
            var event = {
                preventDefault: function() { },
                stopPropagation: function() { }
            };

            spyOn(event, 'preventDefault');
            spyOn(event, 'stopPropagation');

            scope.openStart(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(scope.popupStart.opened).toBe(true);
        });
        it('openEnd should perform popup event', function () {
            var event = {
                preventDefault: function() { },
                stopPropagation: function() { }
            };

            spyOn(event, 'preventDefault');
            spyOn(event, 'stopPropagation');

            scope.openEnd(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(scope.popupEnd.opened).toBe(true);
        });
        it('addSchedule should work', function () {
            scope.schedule.scheduleData = {};
            scope.schedule.editing = null;

            scope.addSchedule(false);
            expect(typeof(scope.schedule.scheduleData)).toEqual('undefined');
            expect(scope.schedule.editing).toBe(true);

            scope.data = mockServices[0];
            scope.data.status = 'oldStatus';
            scope.schedule.scheduleData = {};

            scope.addSchedule(true);
            expect(scope.schedule.scheduleData.previousStatus).toEqual('oldStatus');
            expect(scope.schedule.editing).toBe(true);
        });
        it('isNew should return boolean', function () {
            var schedule = new Schedule();
            var result;
            schedule.mock(mockSchedule1);
            delete scope.data;

            result = scope.isNew(schedule);
            expect(result).toBe(false);

            scope.data = {
                schedules: []
            };

            result = scope.isNew(schedule);
            expect(result).toBe(true);

            scope.data.schedules = [schedule];

            result = scope.isNew(schedule);
            expect(result).toBe(false);
        });
        it('updateSchedule should update the schedule', function () {
            var schedule = {};
            scope.schedule = null;

            scope.updateSchedule(schedule);
            expect(scope.schedule).toBe(schedule);
            expect(scope.schedule.editing).toBe(true);
        });
        it('confirmSchedule should confirm the schedule', function () {
            var schedule = {};
            scope.schedule = schedule;
            scope.data = mockServices[0];

            spyOn(scope.data.schedules, 'push');

            scope.confirmSchedule(schedule);
            expect(scope.data.schedules.push).toHaveBeenCalled();
            expect(scope.changed).toBe(true);
        });
        it('cancelSchedule should confirm the schedule', function () {
            spyOn(scope, 'reset');

            scope.cancelSchedule();
            expect(scope.reset).toHaveBeenCalled();
        });
        it('invalidSchedule should confirm the schedule', function () {
            var oneDayMilliseconds =  24 * 60 * 60 * 1000;
            var todayMilliseconds = new Date().getTime();
            var schedule = {
                editing: true,
                scheduledPostingStart: new Date(todayMilliseconds + 2 * oneDayMilliseconds),
                scheduledPostingEnd: new Date(todayMilliseconds + 4 * oneDayMilliseconds)
            };
            var invalid;

            invalid = scope.invalidSchedule(schedule);
            expect(invalid).toBe(false);

            schedule.scheduledPostingStart = new Date(todayMilliseconds - 4 * oneDayMilliseconds);
            schedule.scheduledPostingEnd =  new Date(todayMilliseconds - 2 * oneDayMilliseconds);

            invalid = scope.invalidSchedule(schedule);
            expect(invalid).toBe(true);
        });
        it('isValid should return boolean', function () {
            var result;
            scope.changed = true;
            scope.editing = false;
            delete scope.message;

            result = scope.isValid();
            expect(result).toBe(true);

            scope.changed = false;
            result = scope.isValid();
            expect(result).toBe(false);

            scope.changed = true;
            scope.editing = true;
            result = scope.isValid();
            expect(result).toBe(false);

            scope.editing = false;
            scope.message = "test";
            result = scope.isValid();
            expect(result).toBe(false);
        });
        it('removeSchedule should return boolean', function () {
            var schedule = {
                editing: true
            };
            scope.data = mockServices[0];
            scope.data.schedules = [schedule];

            spyOn(scope, 'reset');

            scope.removeSchedule(schedule);
            expect(scope.reset).toHaveBeenCalled();
        });
        it('saveSchedule should work', function () {
            scope.data = {
                updateRequested: false,
                schedules: [],
                dirty: function(dirty) { },
                save: function() { }
            };

            spyOn(scope.data, 'dirty');

            var deferred = q.defer();
            spyOn(scope.data, 'save').and.returnValue(deferred.promise);
            scope.saveSchedule();
            deferred.resolve();

            expect(scope.data.dirty).toHaveBeenCalled();
            expect(scope.data.save).toHaveBeenCalled();
        });
    });

});
