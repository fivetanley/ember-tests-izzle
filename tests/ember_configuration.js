/*globals ENV QUnit EmberDev */

(function() {
  window.Ember = {
    testing: true
  };
  window.ENV = window.ENV || {};

  // Test for "hooks in ENV.EMBER_LOAD_HOOKS['hookName'] get executed"
  ENV.EMBER_LOAD_HOOKS = ENV.EMBER_LOAD_HOOKS || {};
  ENV.EMBER_LOAD_HOOKS.__before_ember_test_hook__ = ENV.EMBER_LOAD_HOOKS.__before_ember_test_hook__ || [];
  ENV.__test_hook_count__ = 0;
  ENV.EMBER_LOAD_HOOKS.__before_ember_test_hook__.push(function(object) {
    ENV.__test_hook_count__ += object;
  });

  // Handle extending prototypes
  QUnit.config.urlConfig.push('extendprototypes');

  var extendPrototypes = QUnit.urlParams.extendprototypes;
  ENV['EXTEND_PROTOTYPES'] = !!extendPrototypes;

  // Don't worry about jQuery version
  ENV['FORCE_JQUERY'] = true;

  if (EmberDev.jsHint) {
    // jsHint makes its own Object.create stub, we don't want to use this
    ENV['STUB_OBJECT_CREATE'] = !Object.create;
  }

  ENV['EXPERIMENTAL_CONTROL_HELPER'] = true;

  QUnit.config.urlConfig.push('enablerouteto');
  var enableRouteTo = QUnit.urlParams.enablerouteto;
  ENV['ENABLE_ROUTE_TO'] = !!enableRouteTo;

  EmberDev.distros = {
    spade:   'ember-spade.js',
    build:   'ember.js',
    prod:    'ember.prod.js',
    runtime: 'ember-runtime.js'
  };


})();
(function(){
  var moduleErrors = [];
  var testErrors = [];
  var assertionErrors = [];

  QUnit.moduleDone(function(context) {
    if (context.failed) {
      var msg = { moduleName: context.name, testErrors: testErrors };
      moduleErrors.push(msg);
      testErrors = [];
    }
  });

  QUnit.testDone(function(context) {
    if (context.failed) {
      var msg = { name: context.name, errors: assertionErrors };
      testErrors.push(msg);
      assertionErrors = [];
    } else {
    }
  });

  QUnit.log(function(context) {
    if (context.result) { return; }

    var msg = {}
    if (context.message) {
      msg.message = context.message
    }

    if (context.expected) {
      msg.expected = context.expected;
      msg.actual = context.actual;
    }

    assertionErrors.push(msg);
  });

  QUnit.done(function(context) {
    if (moduleErrors.length){
      context[packageName] = moduleErrors;
    }
    global_test_results = context;
  });
    
})();
