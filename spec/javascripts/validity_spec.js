describe("Validity", function() {
  // item under test
  var validator = null;
  var form = null;
  
  // stubs
  var presenter = {
    hide: function () { },
    show: function () { }
  }
  var invoker = {
    initialize: function (validity) { this.validity = validity; },
    watch: function () { }
  };

  beforeEach(function() {
    validator = new window.ValidityLibrary.Validity(form, presenter, invoker);
  });

  describe("ctor", function() {
  
    it("should have no errors", function() {      
      expect(validator.errors.length).toEqual(0);
    });
    
    it("should have no fields", function() {      
      expect(validator.fields.length).toEqual(0);
    });    
  
  });

  describe("initialize", function() {
  
    it("should call watch on invoker", function() {      
      spyOn(invoker, 'watch');
      validator.initialize();      
      expect(invoker.watch).toHaveBeenCalled();
    });
    
    it("should wire up validators when implicit", function() {     
      loadFixtures('validity_initialize.html');
      form = jQuery("#test-fixture");
      validator = new window.ValidityLibrary.Validity(form, presenter, invoker);
      validator.initialize('implicit');
      expect(validator.fields.length).toEqual(2);
    });
  
    it("should wire up validators when implicit with the correct message", function() {     
      loadFixtures('validity_initialize.html');
      form = jQuery("#test-fixture");
      validator = new window.ValidityLibrary.Validity(form, presenter, invoker);
      validator.initialize('implicit');
      expect(validator.fields.length).toEqual(2);
      expect(validator.fields[0].validators[0].message).toEqual("Field is required");
      expect(validator.fields[1].validators[0].message).toEqual("Test Name 3 is required");      
    });  
  });
  
  describe("hideErrors", function() {
  
    it("should call hide on presenter", function() {      
      spyOn(presenter, 'hide');
      validator.hideErrors();      
      expect(presenter.hide).toHaveBeenCalled();
    });
  
  });

  describe("showErrors", function() {
  
    it("should call show on presenter", function() {      
      spyOn(presenter, 'show');
      validator.showErrors();      
      expect(presenter.show).toHaveBeenCalled();
    });
  
  });

  describe("addError", function() {
  
    it("should add an error", function() {
      validator.addError("testing", "test message");
      expect(validator.errors.length).toEqual(1);
    });
    
    it("should continue to add to errors", function() {
      validator.addError("testing1", "test message 1");
      validator.addError("testing2", "test message 2");     
      expect(validator.errors.length).toEqual(2);
    });    
  
  });
    
    
  describe("removeError", function() {
  
    it("should remove an error", function() {
      validator.addError("testing", "test message");
      expect(validator.errors.length).toEqual(1);
      validator.removeError("testing");
      expect(validator.errors.length).toEqual(0);      
    });
    
    it("should NOT remove an error that does not exist", function() {
      validator.addError("testing", "test message");
      expect(validator.errors.length).toEqual(1);
      validator.removeError("testing-not");
      expect(validator.errors.length).toEqual(1);      
    });
        
    it("should continue to remove errors", function() {
      validator.addError("testing1", "test message 1");
      validator.addError("testing2", "test message 2");     
      expect(validator.errors.length).toEqual(2);
      validator.removeError("testing1");
      validator.removeError("testing2");
      expect(validator.errors.length).toEqual(0);
    });    
  
  });

  describe("clearErrors", function() {
  
    it("should clear an error", function() {
      validator.addError("testing", "test message");
      expect(validator.errors.length).toEqual(1);
      validator.clearErrors();
      expect(validator.errors.length).toEqual(0);      
    });
    
    it("should clear all errors", function() {
      validator.addError("testing1", "test message 1");
      validator.addError("testing2", "test message 2");     
      expect(validator.errors.length).toEqual(2);
      validator.clearErrors();
      expect(validator.errors.length).toEqual(0);
    });    
  
  });
   
   
  describe("addValidationOn", function() {
  
    it("should add validation", function() {
      validator.addValidationOn("field1", null, null);
      expect(validator.fields.length).toEqual(1);
    });
    
    it("should group validations for same field", function() {
      validator.addValidationOn("field1", {}, "message1");
      validator.addValidationOn("field1", {}, "message2");      
      expect(validator.fields.length).toEqual(1);      
    });
    
    it("should add an anonymous function as a validator", function () {
      validator.addValidationOn("field1", function (element) { return false; }, "message1");
      expect(validator.fields.length).toEqual(1);
    });

    it("should add an validation using a string key", function () {
      validator.addValidationOn("field1", "required", "message1");
      expect(validator.fields.length).toEqual(1);
    });
  });
  
  describe("removeValidationFrom", function() {
  
    it("should remove validation and field", function() {
      validator.addValidationOn("field1", {}, "message");
      expect(validator.fields.length).toEqual(1);
      validator.removeValidationFrom("field1");
      expect(validator.fields.length).toEqual(0);
    });
    
    it("should remove validation and field", function() {
      validator1 = { abc: "ABC" };
      validator2 = { xyz: "XYZ" };
      validator.addValidationOn("field1", validator1, "message1");
      validator.addValidationOn("field1", validator2, "message2");      
      expect(validator.fields.length).toEqual(1);
      expect(validator.fields[0].validators.length).toEqual(2);
      validator.removeValidationFrom("field1", validator1);
      expect(validator.fields.length).toEqual(1);
      expect(validator.fields[0].validators.length).toEqual(1);      
    });

    it("should remove validation and field when specifying validator", function() {
      validator1 = { abc: "ABC" };
      validator.addValidationOn("field1", validator1, "message1");
      expect(validator.fields.length).toEqual(1);
      validator.removeValidationFrom("field1", validator1);
      expect(validator.fields.length).toEqual(0);
    });
    
  });
  
  describe("validateForm", function() {
    beforeEach(function() {
      loadFixtures('validity_validate_form.html');
      form = jQuery("#test-fixture");
      validator = new window.ValidityLibrary.Validity(form, presenter, invoker);
    });
      
    it("should return valid", function() {      
      validator.addValidationOn('title', new window.ValidityLibrary.Validators.Required(), 'title is required');
      jQuery('#title-field').val('some-value');
      expect(validator.validateForm()).toEqual(true);
    });

    it("should return invalid", function() {      
      validator.addValidationOn('title', new window.ValidityLibrary.Validators.Required(), 'title is required');
      expect(validator.validateForm()).toEqual(false);
    });
    
    it("should execute anonymous function", function() {      
      validator.addValidationOn('title', function (element) { return false; }, 'title is required');
      jQuery('#title-field').val('some-value');
      expect(validator.validateForm()).toEqual(false);
    });

  });
  
});