// DO NOT MODIFY this file, auto-generated from all js.coffee files in ./src

// compiled ./src/smooth_validator.js.coffee 
(function() {
  var SmoothValidatorImplementation, log;

  if (window.SmoothValidatorLibrary == null) window.SmoothValidatorLibrary = {};

  log = function(message) {
    return typeof console !== "undefined" && console !== null ? console.log(message) : void 0;
  };

  SmoothValidatorImplementation = (function() {

    function SmoothValidatorImplementation(form) {
      this.form = form;
      log("TODO: constructor");
    }

    SmoothValidatorImplementation.prototype.addValidationOn = function(fieldName, validator, message) {
      return log("TODO: addValidationOn");
    };

    SmoothValidatorImplementation.prototype.validateForm = function() {
      log("TODO: validateForm");
      return "foo";
    };

    SmoothValidatorImplementation.prototype.displayErrors = function() {
      return log("TODO");
    };

    SmoothValidatorImplementation.prototype.addError = function(fieldName, message) {
      return log("TODO");
    };

    SmoothValidatorImplementation.prototype.removeError = function(fieldName) {
      return log("TODO");
    };

    return SmoothValidatorImplementation;

  })();

  window.SmoothValidatorLibrary.SmoothValidatorImplementation = SmoothValidatorImplementation;

}).call(this);

