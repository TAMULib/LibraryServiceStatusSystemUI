app.controller("AbstractScheduleController", function ($controller, $scope) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.reset = function () {
        var date = new Date();
        var coeff = 600000;
        var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
        $scope.changed = false;
        $scope.editing = false;
        delete $scope.message;
        $scope.schedule = {
            scheduledPostingStart: rounded.getTime(),
            scheduledPostingEnd: rounded.getTime(),
            scheduleData: {
                nextStatus: 'DOWN'
            },
            editing: false
        };

    };

    $scope.cancel = function () {
        $scope.reset();
        if ($scope.data !== undefined) {
            $scope.data.refresh();
        }
    };

    $scope.reset();

    $scope.dateOptions = {};

    $scope.popupStart = {
        opened: false
    };

    $scope.popupEnd = {
        opened: false
    };

    $scope.openStart = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.popupStart.opened = true;
    };

    $scope.openEnd = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.popupEnd.opened = true;
    };

    $scope.addSchedule = function (useScheduleData) {
        if (useScheduleData) {
            $scope.schedule.scheduleData.previousStatus = $scope.data.status;
        } else {
            delete $scope.schedule.scheduleData;
        }
        $scope.editing = $scope.schedule.editing = true;
        $scope.schedule.isNew = true;
    };

    $scope.updateSchedule = function (schedule) {
        $scope.schedule = schedule;
        $scope.editing = $scope.schedule.editing = true;
    };

    $scope.confirmSchedule = function (schedule) {
        $scope.editing = schedule.editing = false;
        if (schedule.isNew) {
            $scope.data.schedules.push($scope.schedule);
        }
        $scope.reset();
        $scope.changed = true;
    };

    $scope.invalidSchedule = function (schedule) {
        var invalid = false;
        if (schedule.editing) {
            if ($scope.data !== undefined) {
                for (var i in $scope.data.schedules) {
                    if ($scope.data.schedules[i] !== schedule && new Date($scope.data.schedules[i].scheduledPostingStart) < new Date(schedule.scheduledPostingEnd) && new Date($scope.data.schedules[i].scheduledPostingEnd) > new Date(schedule.scheduledPostingStart)) {
                        $scope.message = "Conflicts with another schedule.";
                        return true;
                    }
                }
            }
            invalid = new Date(schedule.scheduledPostingStart) >= new Date(schedule.scheduledPostingEnd);
            if (invalid) {
                $scope.message = "End date and time must be later than start date and time.";
            } else {
                delete $scope.message;
            }
        }
        return invalid;
    };

    $scope.isValid = function () {
        return $scope.changed === true && $scope.editing === false && $scope.message === undefined;
    };

    $scope.removeSchedule = function (schedule) {
        $scope.data.schedules.splice($scope.data.schedules.indexOf(schedule), 1);
        if (schedule.editing) {
            $scope.reset();
        }
        $scope.changed = true;
    };

    $scope.saveSchedule = function () {
        $scope.data.save().then(function (response) {
            if (angular.fromJson(response.body).meta.type === 'SUCCESS') {
                $scope.closeModal();
                $scope.reset();
            }
        });
    };

});
