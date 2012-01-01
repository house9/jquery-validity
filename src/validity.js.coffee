window.ValidityLibrary ?= {}

window.ValidityLibrary.messages = {
  required: "Field is required",
  email: "Email must be a valid format"
}

# *****************************************
class Validity
  constructor: (@form, @presenter, @invoker) ->
    @errors = []
    @fields = []
    @registry = new window.ValidityLibrary.Registry()
    @invoker.initialize(this)
    
  logger: (message) ->
    if window.ValidityLibrary.isDebugEnabled
      if typeof(message) == "string"
        log "Validity Instance: #{message}"
      else
        log message
  
  initialize: (strategy) ->
    @logger(strategy)
    if strategy == 'implicit'
      @form.find(":input").each (index, element) =>
        $element = jQuery(element)
        # TODO: parse css class and then use Registry to get validation object
        if $element.hasClass('validity-required')
          # TODO: support validationMessageKey to support user added entries
          message = if $element.data("validationRequiredMessage") then $element.data("validationRequiredMessage") else window.ValidityLibrary.messages.required
          @addValidationOn($element.attr('name'), new window.ValidityLibrary.Validators.Required(), message)
        
        if $element.hasClass('validity-email')
          message = if $element.data("validationRequiredMessage") then $element.data("validationRequiredMessage") else window.ValidityLibrary.messages.email
          @addValidationOn($element.attr('name'), new window.ValidityLibrary.Validators.Email(), message)        
        # TODO: else every other kind :(
        # possible that regex validators will have data-validation-regex        

    @invoker.watch(@form)
  
  # *****************************************
  # public methods
  # *****************************************
  
  addValidationOn: (fieldName, validator, message) -> 
    if typeof(validator) == "function"
      @logger("validator is a function")
      realValidator = @createValidator(validator)
    else if typeof(validator) == "string"
      @logger("validator is a string")
      realValidator = @registry.getValidator(validator)
    else
      @logger("validator is a validator object")
      realValidator = validator
    
    existing = jQuery.map @fields, (value, index) -> 
      return value if value.fieldName == fieldName
    
    if existing.length == 0  
      set = {fieldName: fieldName, validators: [{validator: realValidator, message: message}]}
      @fields.push(set)
    else
      existing[0].validators.push({validator: realValidator, message: message})
    
  removeValidationFrom: (fieldName, validator = null) ->
    if validator == null
      # remove all validation for field
      @fields = jQuery.map @fields, (value, index) -> 
        return value unless value.fieldName == fieldName
    else
      # remove only a specific validation for field
      for item in @fields
        if item.fieldName == fieldName
          for v in item.validators
            if v?.validator == validator
              item.validators.pop(v)
              
      # we might have a field with no validator now, remove it if that is the case
      @fields = jQuery.map @fields, (value, index) -> 
        return value unless (value.fieldName == fieldName and value.validators.length == 0)
    
  validateForm: () -> 
    valid = true
    for field in @fields
      @logger(field)
      for set in field.validators
        @logger(set)
        unless set.validator.valid(@form.find("input[name='#{field.fieldName}']"))
          # TODO: only one error at a time per field?        
          @addError(field.fieldName, set.message) 
          valid = false

    return valid
    
  hideErrors: () -> 
    @presenter.hide()
    
  showErrors: () -> 
    @presenter.show(@errors)
  
  # TODO: rename addErrorTo  or addErrorOn
  addError: (fieldName, message) -> 
    @errors.push({fieldName: fieldName, message: message})
    
  # TODO: rename removeErrorFrom
  removeError: (fieldName) -> 
    @errors = jQuery.map @errors, (value, index) -> 
      return value unless value.fieldName == fieldName
  
  clearErrors: ->
    @errors = []

  # TODO: rename this method, for diagnostics only
  report: ->
    for field in @fields 
      @logger(field)
  
  createValidator: (anonymousFunction) ->
    return `{ valid: anonymousFunction }`

window.ValidityLibrary.Validity = Validity
 