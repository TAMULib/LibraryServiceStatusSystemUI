var OverallStatus = function OverallStatus($timeout, AlertService) {

    return function OverallStatus() {

        var ALERT_CHANNEL = "status/general";

        var alert;

        var setAlert = function (type, message) {
            if (alert) {
                angular.extend(alert, {
                    class: type === 'ERROR' ? 'danger' : 'success',
                    status: type,
                    message: message
                });
            } else {
                alert = AlertService.add({
                    class: type === 'ERROR' ? 'danger' : 'success',
                    status: type,
                    message: message
                }, ALERT_CHANNEL);
            }
        };

        this.listen(function (res) {
            setAlert(this.type, this.message);
        }.bind(this));

        this.ready().then(function () {
            $timeout(function () {
                setAlert(this.type, this.message);
            }.bind(this), 500);
        }.bind(this));

        return this;
    };

};

app.model("OverallStatusPublic", OverallStatus);
app.model("OverallStatusFull", OverallStatus);
