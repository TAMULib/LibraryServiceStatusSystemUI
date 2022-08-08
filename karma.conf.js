module.exports = function (config) {
  config.set({

    preprocessors: {
      "app/**/*.js": "coverage",
      'app/**/*.html': ['ng-html2js']
    },

    reporters: ['progress', 'coverage', 'coveralls'],

    basePath: './',

    files: [
      'dist/appConfig.js',
      'app/config/apiMapping.js',

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
      "node_modules/jasmine-promise-matchers/dist/jasmine-promise-matchers.js",
      "node_modules/@wvr/core/app/config/coreConfig.js",
      "node_modules/@wvr/core/app/components/**/*.js",
      "node_modules/@wvr/core/app/core.js",
      "node_modules/@wvr/core/app/**/*.js",

      "tests/testSetup.js",

      'app/app.js',
      'app/config/runTime.js',
      'app/components/**/*.js',
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

    failOnEmptyTestSuite: false,

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['ChromeHeadless'],

    plugins: [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-coveralls',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'templates'
    },

    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    }

  });
};
