(function($){
  if ($ === null) {
    $ = jQuery;  
  }

  // Begin plugin
  $.fn.smoothValidator = function(options) {
    
    // support multiple elements
    if (this.length > 1) {
      this.each(function() { 
        $(this).smoothValidator(options);
      });
      return this;
    }

    // private variables
    var undef;
    var validator = null;
    var settings = null;
    var that = this;    

    // private methods
    var foo = function() {
      return settings.foo;
    }
    // ...

    // public methods        
    this.initialize = function() {
      // validator = $.data(that, 'smoothValidatorInstance');
      validator = $(that).data('smoothValidatorInstance');
      // console.log("---->");
      // console.log(validator);
      if (validator === undef) {
        // console.log("Store instance of SmoothValidatorImplementation for " + that.attr('id'));
        validator = new window.SmoothValidatorLibrary.SmoothValidatorImplementation(that);
        // $.data(that, 'smoothValidatorInstance', validator);
        $(that).data('smoothValidatorInstance', validator);
        
        // settings / options merge
        var instanceSettings = {
          debug: false,
          presenter: 'alert',
          invoker: 'submit',
          foo: 'bar-foo'
        };
        instanceSettings = $.extend(instanceSettings, options);                
        $(that).data('smoothValidatorInstanceSettings', instanceSettings);
      }
      settings = $(that).data('smoothValidatorInstanceSettings');
      // console.log(settings);
      return this;
    };

    // wrapper methods to SmoothValidatorImplementation
    this.validateForm = function() {
      return validator.validateForm();
    };
    
    this.publicFoo = function () {
      return foo();
    };
    
    // return jQuery
    return this.initialize();
  } // end plugin
  
})($);