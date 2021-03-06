module.exports = function (config) {
    config.set({

        preprocessors: {
            "app/**/*.js": "coverage",
            '**/*.html': ['ng-html2js']
        },

        reporters: ['progress', 'coverage'],

        basePath: './',

        files: [

            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',

            'node_modules/sockjs-client/dist/sockjs.min.js',
            'node_modules/stompjs/lib/stomp.min.js',

            'node_modules/angular/angular.min.js',

            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-loader/angular-loader.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-messages/angular-messages.min.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
            'node_modules/ng-file-upload/dist/ng-file-upload.min.js',

            'node_modules/ng-table/bundles/ng-table.min.js',

            'node_modules/tinymce/tinymce.min.js',
            'node_modules/angular-ui-tinymce/dist/tinymce.min.js',

            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',


            'node_modules/@wvr/core/app/config/coreConfig.js',

            'node_modules/@wvr/core/app/components/version/version.js',
            'node_modules/@wvr/core/app/components/version/version-directive.js',
            'node_modules/@wvr/core/app/components/version/interpolate-filter.js',

            "node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js",


            'app/config/appConfig.js',
            'app/config/apiMapping.js',

            'app/components/**/*.js',

            'node_modules/@wvr/core/app/core.js',
            'node_modules/@wvr/core/app/setup.js',
            'node_modules/@wvr/core/app/config/coreRuntime.js',
            'node_modules/@wvr/core/app/config/coreAngularConfig.js',
            'node_modules/@wvr/core/app/config/logging.js',

            'node_modules/@wvr/core/app/constants/apiResponseActions.js',
            'node_modules/@wvr/core/app/constants/httpMethodVerbs.js',

            'node_modules/@wvr/core/app/directives/headerDirective.js',
            'node_modules/@wvr/core/app/directives/footerDirective.js',
            'node_modules/@wvr/core/app/directives/userDirective.js',
            'node_modules/@wvr/core/app/directives/modalDirective.js',
            'node_modules/@wvr/core/app/directives/alertDirective.js',
            'node_modules/@wvr/core/app/directives/accordionDirective.js',
            'node_modules/@wvr/core/app/directives/tabsDirective.js',

            'node_modules/@wvr/core/app/directives/tooltipDirective.js',
            'node_modules/@wvr/core/app/directives/validationMessageDirective.js',
            'node_modules/@wvr/core/app/directives/validatedInputDirective.js',
            'node_modules/@wvr/core/app/directives/validatedSelectDirective.js',
            'node_modules/@wvr/core/app/directives/validatedTextAreaDirective.js',

            'node_modules/@wvr/core/app/services/accessControlService.js',
            'node_modules/@wvr/core/app/services/wsService.js',
            'node_modules/@wvr/core/app/services/wsApi.js',
            'node_modules/@wvr/core/app/services/restApi.js',
            'node_modules/@wvr/core/app/services/authService.js',
            'node_modules/@wvr/core/app/services/storageService.js',
            'node_modules/@wvr/core/app/services/utilityService.js',
            'node_modules/@wvr/core/app/services/alertService.js',
            'node_modules/@wvr/core/app/services/validationStore.js',
            'node_modules/@wvr/core/app/services/userService.js',
            'node_modules/@wvr/core/app/services/modalService.js',
            'node_modules/@wvr/core/app/services/modelCache.js',
            'node_modules/@wvr/core/app/services/modelUpdateService.js',

            'node_modules/@wvr/core/app/repo/abstractRepo.js',

            'node_modules/@wvr/core/app/model/abstractModel.js',
            'node_modules/@wvr/core/app/model/assumedControl.js',
            'node_modules/@wvr/core/app/model/user.js',

            'node_modules/@wvr/core/app/controllers/abstractController.js',
            'node_modules/@wvr/core/app/controllers/coreAdminController.js',
            'node_modules/@wvr/core/app/controllers/authenticationController.js',
            'node_modules/@wvr/core/app/controllers/loginController.js',
            'node_modules/@wvr/core/app/controllers/registrationController.js',
            'node_modules/@wvr/core/app/controllers/userController.js',
            'node_modules/@wvr/core/app/controllers/errorPageController.js',

            'app/app.js',

            'app/config/runTime.js',

            'app/constants/**/*.js',

            'app/controllers/**/*.js',

            'app/directives/**/*.js',

            'app/services/**/*.js',

            'app/model/**/*.js',

            'app/repo/**/*.js',

            'app/views/**/*.html',

            'tests/core/**/*.js',

            'tests/mocks/**/*.js',

            'tests/unit/**/*.js'

        ],

        autoWatch: true,

        failOnEmptyTestSuite: false,

        frameworks: ['jasmine'],

        browsers: ['ChromeHeadless', 'Firefox'],

        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        coverageReporter: {
            type: "lcov",
            dir: "coverage/"
        }

    });
};
