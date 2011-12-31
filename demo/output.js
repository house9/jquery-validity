// DO NOT MODIFY this file, auto-generated from all js.coffee files in ./src

// global log method 
var undefVariable;
if (window.log === undefVariable) {
  // usage: log('inside coolFunc', this, arguments);
  // paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
  window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console) {
      arguments.callee = arguments.callee.caller;
      var newarr = [].slice.call(arguments);
      (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
  };

  // make it safe to use console.log always
  (function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
  {console.log();return window.console;}catch(err){return window.console={};}})());
}
// compiled ./src/invokers/blur.js.coffee 
(function() {
  var Blur, _base;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  if ((_base = window.ValidityLibrary).Invokers == null) _base.Invokers = {};

  Blur = (function() {

    function Blur() {}

    return Blur;

  })();

  window.ValidityLibrary.Invokers.Blur = Blur;

}).call(this);

// compiled ./src/invokers/submit.js.coffee 
(function() {
  var Submit, _base;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  if ((_base = window.ValidityLibrary).Invokers == null) _base.Invokers = {};

  Submit = (function() {

    function Submit() {
      this.logger("ctor");
    }

    Submit.prototype.initialize = function(validity) {
      this.validity = validity;
      return this.logger("initialize");
    };

    Submit.prototype.watch = function(element) {
      var form,
        _this = this;
      this.logger("watch, bind submit to form");
      form = element;
      form.bind("submit", function(event) {
        return _this.callback(event);
      });
      return true;
    };

    Submit.prototype.callback = function(event) {
      this.logger("callback");
      this.logger(event.target);
      if (this.validity.validateForm()) {
        return true;
      } else {
        this.validity.showErrors();
        this.validity.clearErrors();
        return false;
      }
    };

    Submit.prototype.logger = function(message) {
      if (window.ValidityLibrary.isDebugEnabled) {
        return log(" - Invokers::Submit: " + message);
      }
    };

    return Submit;

  })();

  window.ValidityLibrary.Invokers.Submit = Submit;

}).call(this);

// compiled ./src/presenters/alert.js.coffee 
(function() {
  var Alert, _base;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  if ((_base = window.ValidityLibrary).Presenters == null) _base.Presenters = {};

  Alert = (function() {

    function Alert() {
      this.logger("ctor");
    }

    Alert.prototype.show = function(errors) {
      var item, message, _i, _len;
      this.logger("show");
      this.logger(errors);
      message = window.ValidityLibrary.defaultSummaryText;
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        item = errors[_i];
        this.logger(item);
        message = message + ("\n - " + item.message);
      }
      return alert(message);
    };

    Alert.prototype.logger = function(message) {
      if (window.ValidityLibrary.isDebugEnabled) {
        if (typeof message === "string") {
          return log(" - Presenters::Alert: " + message);
        } else {
          return log(message);
        }
      }
    };

    return Alert;

  })();

  window.ValidityLibrary.Presenters.Alert = Alert;

}).call(this);

// compiled ./src/presenters/inline.js.coffee 
(function() {
  var Inline, _base;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  if ((_base = window.ValidityLibrary).Presenters == null) _base.Presenters = {};

  Inline = (function() {

    function Inline() {}

    return Inline;

  })();

  window.ValidityLibrary.Presenters.Inline = Inline;

}).call(this);

// compiled ./src/presenters/summary.js.coffee 
(function() {
  var Summary, _base;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  if ((_base = window.ValidityLibrary).Presenters == null) _base.Presenters = {};

  Summary = (function() {

    function Summary() {}

    return Summary;

  })();

  window.ValidityLibrary.Presenters.Summary = Summary;

}).call(this);

// compiled ./src/registry.js.coffee 
(function() {
  var Registry;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  Registry = (function() {

    function Registry() {
      this.presenters = {
        "alert": new window.ValidityLibrary.Presenters.Alert(),
        "inline": new window.ValidityLibrary.Presenters.Inline(),
        "summary": new window.ValidityLibrary.Presenters.Summary()
      };
      this.invokers = {
        "blur": new window.ValidityLibrary.Invokers.Blur(),
        "submit": new window.ValidityLibrary.Invokers.Submit()
      };
    }

    Registry.prototype.getPresenter = function(presenterToken) {
      var presenter;
      presenter = this.presenters[presenterToken];
      if (presenter == null) {
        throw "Invalid presenter for '" + presenterToken + "', try one of " + (this.show(this.presenters));
      }
      return presenter;
    };

    Registry.prototype.getInvoker = function(invokerToken) {
      var invoker;
      invoker = this.invokers[invokerToken];
      if (invoker == null) {
        throw "Invalid invoker for '" + invokerToken + "', try one of " + (this.show(this.invokers));
      }
      return invoker;
    };

    Registry.prototype.show = function(object) {
      var display, key, value;
      display = (function() {
        var _results;
        _results = [];
        for (key in object) {
          value = object[key];
          _results.push("" + key);
        }
        return _results;
      })();
      return "[" + (display.join(', ')) + "]";
    };

    return Registry;

  })();

  window.ValidityLibrary.Registry = Registry;

}).call(this);

// compiled ./src/validators/email.js.coffee 
(function() {



}).call(this);

// compiled ./src/validators/regex.js.coffee 
(function() {



}).call(this);

// compiled ./src/validators/required.js.coffee 
(function() {
  var Required, _base;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  if ((_base = window.ValidityLibrary).Validators == null) _base.Validators = {};

  Required = (function() {

    function Required() {
      console.log("Required");
    }

    Required.prototype.valid = function(field) {
      this.logger("valid");
      this.logger(field);
      return field.val() !== "";
    };

    Required.prototype.logger = function(message) {
      if (window.ValidityLibrary.isDebugEnabled) {
        if (typeof message === "string") {
          return log(" - Validators::Required: " + message);
        } else {
          return log(message);
        }
      }
    };

    return Required;

  })();

  window.ValidityLibrary.Validators.Required = Required;

}).call(this);

// compiled ./src/validators/url.js.coffee 
(function() {



}).call(this);

// compiled ./src/validity.js.coffee 
(function() {
  var Validity;

  if (window.ValidityLibrary == null) window.ValidityLibrary = {};

  Validity = (function() {

    function Validity(form, presenter, invoker) {
      this.form = form;
      this.presenter = presenter;
      this.invoker = invoker;
      this.errors = [];
      this.fields = [];
      this.invoker.initialize(this);
    }

    Validity.prototype.logger = function(message) {
      if (window.ValidityLibrary.isDebugEnabled) {
        if (typeof message === "string") {
          return log("Validity Instance: " + message);
        } else {
          return log(message);
        }
      }
    };

    Validity.prototype.initialize = function(strategy) {
      var _this = this;
      this.logger(strategy);
      if (strategy === 'implicit') {
        this.form.find(":input").each(function(index, element) {
          var $element, message;
          $element = jQuery(element);
          if ($element.hasClass('validity-required')) {
            message = $element.data("validationRequiredMessage") ? $element.data("validationRequiredMessage") : "Field is required";
            return _this.addValidationOn($element.attr('name'), new window.ValidityLibrary.Validators.Required(), message);
          }
        });
      }
      return this.invoker.watch(this.form);
    };

    Validity.prototype.addValidationOn = function(fieldName, validator, message) {
      var existing, set;
      existing = jQuery.map(this.fields, function(value, index) {
        if (value.fieldName === fieldName) return value;
      });
      if (existing.length === 0) {
        set = {
          fieldName: fieldName,
          validators: [
            {
              validator: validator,
              message: message
            }
          ]
        };
        return this.fields.push(set);
      } else {
        return existing[0].validators.push({
          validator: validator,
          message: message
        });
      }
    };

    Validity.prototype.removeValidationFrom = function(fieldName, validator) {
      var item, v, _i, _j, _len, _len2, _ref, _ref2;
      if (validator == null) validator = null;
      if (validator === null) {
        return this.fields = jQuery.map(this.fields, function(value, index) {
          if (value.fieldName !== fieldName) return value;
        });
      } else {
        _ref = this.fields;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item.fieldName === fieldName) {
            _ref2 = item.validators;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              v = _ref2[_j];
              if ((v != null ? v.validator : void 0) === validator) {
                item.validators.pop(v);
              }
            }
          }
        }
        return this.fields = jQuery.map(this.fields, function(value, index) {
          if (!(value.fieldName === fieldName && value.validators.length === 0)) {
            return value;
          }
        });
      }
    };

    Validity.prototype.validateForm = function() {
      var field, set, valid, _i, _j, _len, _len2, _ref, _ref2;
      valid = true;
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        this.logger(field);
        _ref2 = field.validators;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          set = _ref2[_j];
          this.logger(set);
          if (!set.validator.valid(this.form.find("input[name='" + field.fieldName + "']"))) {
            this.addError(field.fieldName, set.message);
            valid = false;
          }
        }
      }
      return valid;
    };

    Validity.prototype.hideErrors = function() {
      return this.presenter.hide();
    };

    Validity.prototype.showErrors = function() {
      return this.presenter.show(this.errors);
    };

    Validity.prototype.addError = function(fieldName, message) {
      return this.errors.push({
        fieldName: fieldName,
        message: message
      });
    };

    Validity.prototype.removeError = function(fieldName) {
      return this.errors = jQuery.map(this.errors, function(value, index) {
        if (value.fieldName !== fieldName) return value;
      });
    };

    Validity.prototype.clearErrors = function() {
      return this.errors = [];
    };

    Validity.prototype.report = function() {
      var field, _i, _len, _ref, _results;
      _ref = this.fields;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        _results.push(this.logger(field));
      }
      return _results;
    };

    return Validity;

  })();

  window.ValidityLibrary.Validity = Validity;

}).call(this);

// plugin: validity 
(function($){
  var undef;
  var keys = { 
    instance: 'validityInstance',
    settings: 'validityInstanceSettings'
  }
  
  if (window.ValidityLibrary === null) {
    window.ValidityLibrary = {};
  }
  window.ValidityLibrary.isDebugEnabled = false;
  window.ValidityLibrary.defaultSummaryText = "The following errors have occurred:"
    
  function logger(message) {
    if (window.ValidityLibrary.isDebugEnabled) { 
      if (typeof message === "string") {
        log("validity plugin: " + message);
      } else {
        log(message);
      }      
    }
  } 

  // TODO: add 
  // - callbacks for validateForm, success and fail
  // - add validateField method

  // ***************************************
  // ***************************************
  // Begin plugin
  $.fn.validity = function(options, debug) {
    if (debug && debug === true) {
      window.ValidityLibrary.isDebugEnabled = true;
    }
    
    // support multiple elements
    logger("wire up validity for " + this.length + " elements");
    if (this.length > 1) {
      this.each(function() {
        $(this).validity(options);
      });
      return this;
    }

    // private variables
    var validator = null;
    var settings = null;
    var that = this;

    // private methods
    // NONE
    
    // TODO: fix up this and that references

    // public methods        
    this.initialize = function() {
      logger("initialize for...");
      logger(this);
            
      // find existing plugin for this 'element' if exists
      validator = $(that).data(keys.instance);

      // init if does not exist
      if (validator === undef) {
        logger(" - set options and create new Validity instance");
        // settings / options merge
        var instanceSettings = {
          debug: false,
          presenter: 'alert',
          invoker: 'submit',
          strategy: 'implicit'
        };
        instanceSettings = $.extend(instanceSettings, options);
        logger(instanceSettings);
        
        var registry = new window.ValidityLibrary.Registry(); 
        var presenter = registry.getPresenter(instanceSettings.presenter);
        var invoker = registry.getInvoker(instanceSettings.invoker);
        
        validator = new window.ValidityLibrary.Validity(that, presenter, invoker);
        validator.initialize(instanceSettings.strategy);
        
        $(that).data(keys.instance, validator);
        $(that).data(keys.settings, instanceSettings);
        
      } else {
        logger(" - use existing options and Validity instance");
        
        // retrieve settings that already have been set 
        settings = $(that).data(keys.settings);
        logger(settings);
      }
      
      // return plugin instance
      return this;
    };

    // wrapper methods to SmoothValidatorImplementation
    this.addValidationOn = function (fieldName, validation, message) {
      logger("addValidationOn");
      return validator.addValidationOn(fieldName, validation, message);
    }

    this.hideErrors = function() {
      logger("hideErrors");
      return validator.hideErrors();
    };

    this.showErrors = function() {
      logger("showErrors");
      return validator.showErrors();
    };

    this.addError = function(fieldName, message) {
      logger("addError");
      return validator.addError(fieldName, message);
    };

    this.removeError = function(fieldName) {
      logger("removeError");
      return validator.removeError(fieldName);
    };

    this.clearErrors = function() {
      logger("clearErrors");
      return validator.clearErrors();
    };
    
    this.validateForm = function () {
      logger("validateForm");
      return validator.validateForm();
    };
    
    this.dump = function () {
      logger(" ");
      logger("=== validity plugin DUMP");
      logger(" -- settings");
      logger(settings);
      logger(" -- validator");
      logger(validator);      
      logger("=== validity plugin END DUMP");
      logger(" ");      
    }
    
    // return jQuery
    return this.initialize();
  } // end plugin
  
})(jQuery);