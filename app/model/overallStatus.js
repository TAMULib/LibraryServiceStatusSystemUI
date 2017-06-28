
var OverallStatus = function OverallStatus(AlertService) {

    return function OverallStatus() {

        // additional app level model methods and variables
        var ALERT_CHANNEL = "status/general";
        var count = 0;

        this.listen(function(){
            AlertService.removeAll(ALERT_CHANNEL);
            AlertService.add({type: this.type, message: this.message + " " + (count++)}, ALERT_CHANNEL);
        }.bind(this));

        this.ready().then(function() {
            AlertService.add({type: this.type, message: this.message}, ALERT_CHANNEL);
        }.bind(this));

        return this;
    };

}

app.model("OverallStatusPublic", OverallStatus);
app.model("OverallStatusFull", OverallStatus);