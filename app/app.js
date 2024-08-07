var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ngTable'
]);

app.model = core.model;
app.repo = core.repo;

var unreachableAlert = function (injector) {
    if (injector !== undefined) {
        AlertService = injector.get('AlertService');
        AlertService.add({
            type: "ERROR",
            message: "Web service cannot be reached."
        }, "/app/errors");
    } else {
        //foreward to error page
        console.log('forward to error page');
    }
};

//This method's callback is passed to stomp and executed on both successfull connection, as well as disconnect.
setUpApp(function (connected) {

    //Indicates at app start if the app has successfully conenected to the service
    appConfig.connected = connected;

    app.constant('appConfig', appConfig);
    app.constant('api', apiMapping);

    angular.element(document).ready(function () {
        var doc = angular.element(document);
        var injector = doc.injector();

        try {
            //If the app is already bootstrapped then an error will be thrown
            angular.bootstrap(document, ['app', 'core', 'ngMessages', 'ngFileUpload', 'ui.bootstrap']);

            if (!window.stompClient.connected) {
                unreachableAlert(injector);
            }
        } catch (e) {
            /*
             * If websockets dissconnect the app will attempt to re-bootstrap. Since the app is already running we will
             * end up in this block, and can generate an error indicating the disconnect.
             */
            console.log("Angular could not bootstrap", e);
            unreachableAlert(injector);
        }
    });

});
