app.controller("AbstractScheduleController", function ($controller, $scope) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.reset = function () {
        var date = new Date();
        var coeff = 600000;
        var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
        $scope.schedule = {
            scheduledPostingStart: rounded.getTime(),
            scheduledPostingEnd: rounded.getTime(),
            scheduleData: {
                nextStatus: 'DOWN'
            }
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
            $scope.schedule.scheduleData = {};
        }
        $scope.data.schedules.push($scope.schedule);
    };

    $scope.invalidSchedule = function () {
        if ($scope.data !== undefined) {
            for (var i in $scope.data.schedules) {
                if (new Date($scope.data.schedules[i].scheduledPostingStart) < new Date($scope.schedule.scheduledPostingEnd) && new Date($scope.data.schedules[i].scheduledPostingEnd) > new Date($scope.schedule.scheduledPostingStart)) {
                    return true;
                }
            }
        }
        return new Date($scope.schedule.scheduledPostingStart) >= new Date($scope.schedule.scheduledPostingEnd);
    };

    $scope.removeSchedule = function (schedule) {
        $scope.data.schedules.splice($scope.data.schedules.indexOf(schedule), 1);
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
