describe('model: AssumedControl', function () {

    var AssumedControl;

    beforeEach(function() {
        module('core');
        module('app');
        module('AssumedControl');

        inject(function ($q, _WsApi_, $injector) {
            ProjectService = $injector.get('ProjectService');
            WsApi = _WsApi_;
            installPromiseMatchers();
        });

        inject(function (_AssumedControl_) {
            AssumedControl = _AssumedControl_;
        });
    });

});
