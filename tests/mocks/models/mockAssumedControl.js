var mockAssumedControl1 = {
    'user': {
        "uin": "123456789",
        "lastName": "Daniels",
        "firstName": "Jack",
        "role": "ROLE_ADMIN"
    },
    'netid': '',
    'button': 'Unassume',
    'status': ''
};

var mockAssumedControl2 = {
    'user': {
        "uin": "987654321",
        "lastName": "Daniels",
        "firstName": "Jill",
        "role": "ROLE_USER"
    },
    'netid': '',
    'button': 'Unassume',
    'status': ''
};

var mockAssumedControl3 = {
    'user': {},
    'netid': '',
    'button': 'Assume',
    'status': ''
};

angular.module('mock.AssumedControl', []).service('AssumedControl', function ($q) {
        var defer;
        var payloadResponse = function (payload) {
            return defer.resolve({
                body: angular.toJson({
                    meta: {
                        status: 'SUCCESS'
                    },
                    payload: payload
                })
            });
        };

        this.isDirty = false;

        this.mock = function(toMock) {
            this.user = toMock.user;
            this.netid = toMock.netid;
            this.button = toMock.button;
            this.status = toMock.status;
        };

        this.save = function() {
        };

        this.delete = function() {
            defer = $q.defer();
            payloadResponse();
            return defer.promise;
        };

        this.dirty = function(boolean) {
            this.isDirty = boolean;
        };

        this.refresh = function() {
        };

        return this;
});
