window.ValidityLibrary ?= {}
window.ValidityLibrary.Presenters ?= {}

class Alert
  constructor: ->
    @logger("ctor")
  
  show: (errors) ->
    @logger("show")
    @logger(errors)
    message = window.ValidityLibrary.defaultSummaryText;
    for item in errors
      # TODO: add css to item.fieldName ? maybe only on other presenters?
      @logger(item)
      message = message + "\n - #{item.message}"

    # show errors  
    alert(message)    
    
  logger: (message) ->
    if window.ValidityLibrary.isDebugEnabled
      if typeof(message) == "string"      
        log(" - Presenters::Alert: #{message}")
      else
        log(message)
    
window.ValidityLibrary.Presenters.Alert = Alert 