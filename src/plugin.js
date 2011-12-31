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