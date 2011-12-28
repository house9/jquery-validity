window.ValidityLibrary ?= {}

# *****************************************
class Validity
  constructor: (@form, @presenter, @invoker) ->
    @errors = []
    @fields = []
    # @presenter.initialize(this)
    @invoker.initialize(this)
    
  logger: (message) ->
    if window.ValidityLibrary.isDebugEnabled
      if typeof(message) == "string"
        log "Validity Instance: #{message}"
      else
        log message
  
  initialize: (strategy) ->
    @logger(strategy)
    # strategy -> implicit
    #   go through each control in the form looking for validation css
    #   for each one check for a data-validation-message attribute or use default
    #   call addValidationOn(field, new Validators.Required(), message)
    #   possible that regex validators will have data-validation-regex
    # strategy -> explicit
    #   expect client code to call addValidationOn as needed, can also call it after implicit
    @invoker.watch(@form)
  
  # *****************************************
  # public methods
  # *****************************************
  
  addValidationOn: (fieldName, validator, message) -> 
    existing = jQuery.map @fields, (value, index) -> 
      return value if value.fieldName == fieldName
    
    if existing.length == 0  
      set = {fieldName: fieldName, validators: [{validator: validator, message: message}]}
      @fields.push(set)
    else
      existing[0].validators.push({validator: validator, message: message})
    
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
        @logger(typeof(set.validator) == "function")
        unless set.validator.valid(@form.find("input[name='#{field.fieldName}']"))
          @addError(field.fieldName, set.message) # TODO: only one error at a time per field?
          valid = false

    return valid
    # @logger("validateForm - stub: return true")
    # return true
    # @logger("validateForm - stub: return false")
    # return false
    # loop through each @fields
    # check first validation from @fields validators arrays 
    #   if valid, then check next on @field
    #   if invalid update errors
    # log "TODO: validateForm"
    
  
    
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