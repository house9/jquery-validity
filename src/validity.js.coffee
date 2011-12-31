window.ValidityLibrary ?= {}

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
        if $element.hasClass('validity-required')
          message = if $element.data("validationRequiredMessage") then $element.data("validationRequiredMessage") else "Field is required"
          @addValidationOn($element.attr('name'), new window.ValidityLibrary.Validators.Required(), message)
          
        # TODO: else every other kind :(

    @invoker.watch(@form)    

    # strategy -> implicit
    #   go through each control in the form looking for validation css
    #   for each one check for a data-validation-message attribute or use default
    #   call addValidationOn(field, new Validators.Required(), message)
    #   possible that regex validators will have data-validation-regex
    # strategy -> explicit
    #   expect client code to call addValidationOn as needed, can also call it after implicit

  
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
      
    # TODO: figure it out validator = { valid: -> validator() } if typeof(validator) == "function"
    
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
        # TODO: handle anonymous method in place of valid()
        # @logger(typeof(set.validator) == "function")
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
  
#   
#   
# 
# # TODO: re-think messages
# # they should be part of validator? or messaging object (notifications) ???
# # think of multi-language and then custom messages
# 
# 
# # # Usage
# # v = new SmoothValidator()
# # v.addValidationOn("email", "required", "Email is required")
# # v.addValidationOn("email", "email", "Invalid email format")
# # uniqueEmailFunction = (element) -> log "TODO"
# # 
# # v.addValidationOn("email", uniqueEmailFunction, "Email must be unique")
# # 
# # console.log "x" 
# 
#  