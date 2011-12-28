window.SmoothValidatorLibrary ?= {}
# window.SmoothValidatorLibrary.enableLogging = false
# window.SmoothValidatorLibrary.log = (message) -> 
#   console?.log message if enableLogging

log = (message) ->
  console?.log message

# *****************************************
class SmoothValidatorImplementation
  constructor: (form) ->
    @form = form
    log "TODO: constructor"
    
  # public methods ?
  addValidationOn: (fieldName, validator, message) -> log "TODO: addValidationOn"
  validateForm: () -> 
    log "TODO: validateForm"
    return "foo"
    
  displayErrors: () -> log "TODO"
  addError: (fieldName, message) -> log "TODO"
  removeError: (fieldName) -> log "TODO"


window.SmoothValidatorLibrary.SmoothValidatorImplementation = SmoothValidatorImplementation

# enableLogging = false
# log= (message)-> console?.log message if enableLogging
#   
# do ($ = jQuery) ->
#   # Adds plugin object to jQuery
#   $.fn.extend {}=
#     # plugin: smoothValidator
#     smoothyValidator: (options) ->
#       # Default settings
#       settings =
#         option1: true
#         option2: false
#         debug: false
# 
#       # Merge default settings with options.
#       settings = $.extend settings, options
#       
#       enableLogging = true if settings.debug
# 
#       # # Simple logger.
#       # log = (message) ->
#       #   console?.log message if settings.debug
# 
#       # plugin code
#       return @each () ->
#         $t = $(this)
#         log "Init: #{$t.attr('id')}"
# 
#         $.fn.extend.validatorReference = new SmoothValidator(this)
#         $t.addValidationOn = -> (fieldName, validator, message) -> this.validatorReference.addValidationOn(fieldName, validator, message)
#         
#         # $validator = new SmoothValidator(this)        
#         # $validator.validateForm()
#         
#         return this
#   
# 
# # *****************************************
# class SmoothValidatorImplementation
#   constructor: (form) ->
#     log "TODO: constructor"
#     
#   # public methods ?
#   addValidationOn: (fieldName, validator, message) -> log "TODO: addValidationOn"
#   validateForm: () -> log "TODO: validateForm"
#   displayErrors: () -> log "TODO"
#   addError: (fieldName, message) -> log "TODO"
#   removeError: (fieldName) -> log "TODO"
#   
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