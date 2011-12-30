window.ValidityLibrary ?= {}
window.ValidityLibrary.Invokers ?= {}

class Submit
  constructor: ->
    @logger("ctor")
  
  initialize: (@validity) ->
    @logger("initialize")
    
  watch: (element) -> 
    @logger("watch, bind submit to form")
    form = element
    form.bind("submit", (event) => @callback(event))
    # jQuery
    return true

  callback: (event) ->
    @logger("callback")
    #event.preventDefault()
    
    @logger(event.target)
    if @validity.validateForm()
      # event.target.submit()
      return true
    else
      #event.preventDefault()
      @validity.showErrors()
      @validity.clearErrors() # we already showed them
      return false
    
  logger: (message) ->
    if window.ValidityLibrary.isDebugEnabled
      log(" - Invokers::Submit: #{message}")
  
  
window.ValidityLibrary.Invokers.Submit = Submit
