var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});

exports.config = {
  params: {
    mainUrl: "https://costco.mexico.local:9002/"
  },
  specs: ['js/**Test.js'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--start-maximized', '--no-sandbox', '--test-type=browser', '--js-flags=--expose-gc'],
      'prefs': {
        // 'profile.managed_default_content_settings.images': 2 don't load images
      }
    }
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 1000000000,
    showColors: true
  },
  baseUrl: 'https://costco.mexico.local:9002/',
  onPrepare: () => {
    var width = 1680;
    var height = 1050;
    browser.driver.manage().window().setSize(width, height);
    browser.driver.manage().window().maximize();

    // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
    jasmine.getEnv().addReporter(reporter);


    browser.ignoreSynchronization = true; // or false
    global.EC = protractor.ExpectedConditions;


    function toElement(selector) {
      if (typeof selector === 'string' || selector instanceof String) {
        return element.all(by.css(selector)).first();
      }
      return selector;
    }

    function waitFor(selector, timeout) {
      const e = toElement(selector)
      return browser.wait(EC.elementToBeClickable(e), timeout || 5000);
    }

    global.toElement = toElement;

    global.waitFor = waitFor;

    global.waitAndClick = (selector, timeout) => {
      const e = toElement(selector);
      return waitFor(e, timeout).then(e.click);
    }
  },
  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve) {
      reporter.beforeLaunch(resolve);
    });
  },
  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
