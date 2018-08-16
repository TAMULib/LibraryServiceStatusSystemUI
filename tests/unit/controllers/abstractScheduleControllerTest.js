describe('controller: AbstractScheduleController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('app');

        inject(function ($controller, $rootScope) {
            installPromiseMatchers();
            scope = $rootScope.$new();
            controller = $controller('AbstractScheduleController', {
                $scope: scope
            });
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
            var data = scope.data;
            scope.changed = null;

            if (data !== undefined) {
                spyOn(scope.data, 'refresh');
            }

            scope.cancel();
            expect(scope.changed).toBe(false);

            if (data !== undefined) {
                expect(data.refresh).toHaveBeenCalled();
            }
        });
        it('openStart should perform popup event', function () {
            var mockEvent = {
                preventDefault: function() { },
                stopPropagation: function() { }
            };

            spyOn(mockEvent, 'preventDefault');
            spyOn(mockEvent, 'stopPropagation');

            scope.openStart(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(scope.popupStart.opened).toBe(true);
        });
        it('openEnd should perform popup event', function () {
            var mockEvent = {
                preventDefault: function() { },
                stopPropagation: function() { }
            };

            spyOn(mockEvent, 'preventDefault');
            spyOn(mockEvent, 'stopPropagation');

            scope.openEnd(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(mockEvent.stopPropagation).toHaveBeenCalled();
            expect(scope.popupEnd.opened).toBe(true);
        });
        it('addSchedule should work', function () {
            scope.schedule.scheduleData = {};
            scope.schedule.editing = null;
            scope.addSchedule(false);
            expect(typeof(scope.schedule.scheduleData)).toEqual('undefined');
            expect(scope.schedule.editing).toBe(true);

            scope.data = {
                status: 'oldStatus'
            };
            scope.schedule.scheduleData = {};
            scope.addSchedule(true);
            expect(scope.schedule.scheduleData.previousStatus).toEqual('oldStatus');
            expect(scope.schedule.editing).toBe(true);
        });
        it('isNew should return boolean', function () {
            expect(scope.isNew).toBeTruthy();
        });
        it('updateSchedule should update the schedule', function () {
            var mockSchedule = {};
            scope.schedule = null;

            scope.updateSchedule(mockSchedule);
            expect(scope.schedule).toBe(mockSchedule);
            expect(scope.schedule.editing).toBe(true);
        });
        it('confirmSchedule should confirm the schedule', function () {
            var mockSchedule = {};
            scope.schedule = mockSchedule;
            scope.data = {
                schedules: {
                    push: function (schedule) {},
                    indexOf: function (index) { return -1; }
                }
            };

            spyOn(scope.data.schedules, 'push');

            scope.confirmSchedule(mockSchedule);
            expect(scope.data.schedules.push).toHaveBeenCalled();
            expect(scope.changed).toBe(true);
        });
        it('isValid should return boolean', function () {
            expect(scope.isValid).toBeTruthy();
        });
    });

});
