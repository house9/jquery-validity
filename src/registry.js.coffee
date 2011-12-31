window.ValidityLibrary ?= {}

class Registry
  constructor: ->
    @presenters = {
      "alert": new window.ValidityLibrary.Presenters.Alert(),
      "inline": new window.ValidityLibrary.Presenters.Inline(),
      "summary": new window.ValidityLibrary.Presenters.Summary()
    }
    
    @invokers = {
      "blur": new window.ValidityLibrary.Invokers.Blur(),
      "submit": new window.ValidityLibrary.Invokers.Submit()
    }
    
    @validators = {
      "required": new window.ValidityLibrary.Validators.Required(),
      "email": new window.ValidityLibrary.Validators.Email()
    }
  
  getPresenter: (presenterToken) ->
    presenter = @presenters[presenterToken]
    throw "Invalid presenter for '#{presenterToken}', try one of #{@show(@presenters)}" unless presenter?
    return presenter
    
  getInvoker: (invokerToken) ->
    invoker = @invokers[invokerToken]
    throw "Invalid invoker for '#{invokerToken}', try one of #{@show(@invokers)}" unless invoker?
    return invoker
    
  getValidator: (validatorToken) ->
    validator = @validators[validatorToken]
    throw "Invalid validator for '#{validatorToken}', try one of #{@show(@validators)}" unless validator?
    return validator
    
  show: (object) ->
    display = for key, value of object 
      "#{key}"
    return "[#{display.join(', ')}]"
    
window.ValidityLibrary.Registry = Registry