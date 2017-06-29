
var OverallStatus = function OverallStatus($timeout, AlertService) {

    return function OverallStatus() {

        // additional app level model methods and variables
        var ALERT_CHANNEL = "status/general";
        var count = 0;

        var alert;

        this.listen(function(){
            alert.type = this.type;
            alert.message = this.message + " " + (count++);
        }.bind(this));

        this.ready().then(function() {
            alert = AlertService.add({type: this.type, message: this.message}, ALERT_CHANNEL);
        }.bind(this));

        return this;
    };

}

app.model("OverallStatusPublic", OverallStatus);
app.model("OverallStatusFull", OverallStatus);