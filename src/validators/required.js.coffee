window.ValidityLibrary ?= {}
window.ValidityLibrary.Validators ?= {}

class Required
  constructor: ->
    @logger("Required")
    
  valid: (field) ->
    @logger("valid")
    @logger(field)
    return (field.val() != "")
    
  logger: (message) ->
    if window.ValidityLibrary.isDebugEnabled
      if typeof(message) == "string"      
        log(" - Validators::Required: #{message}")
      else
        log(message)
    
window.ValidityLibrary.Validators.Required = Required
