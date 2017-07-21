
var OverallStatus = function OverallStatus($timeout, AlertService) {

    return function OverallStatus() {

        var ALERT_CHANNEL = "status/general";

        var alert;
        this.listen(function(){
            if(alert) {
                alert.class = this.type === "ERROR" ? "danger" : "success";
                alert.message = this.message;
            }
        }.bind(this));

        this.ready().then(function() {
            alert = AlertService.add({type: this.type, message: this.message}, ALERT_CHANNEL);
        }.bind(this));

        return this;
    };

}

app.model("OverallStatusPublic", OverallStatus);
app.model("OverallStatusFull", OverallStatus);