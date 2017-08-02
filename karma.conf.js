module.exports = function (config) {
    config.set({

        basePath: './',

        files: [

            'app/config/appConfig.js',
            'app/config/apiMapping.js',

            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'node_modules/ng-table/dist/ng-table.min.js',
            'node_modules/ng-csv/build/ng-csv.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',

            'node_modules/weaver-ui-core/app/config/coreConfig.js',

            'node_modules/weaver-ui-core/app/components/**/*.js',

            'node_modules/weaver-ui-core/app/core.js',

            'node_modules/weaver-ui-core/app/**/*.js',


            'app/components/**/*.js',

            'tests/testSetup.js',

            'app/app.js',

            'app/config/runTime.js',

            'app/controllers/**/*.js',

            'app/directives/**/*.js',

            'app/services/**/*.js',

            'app/models/**/*.js',


            'tests/mocks/**/*.js',

            'tests/unit/**/*.js'

        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
