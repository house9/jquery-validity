window.ValidityLibrary ?= {}
window.ValidityLibrary.Validators ?= {}

class Required
  valid: (field) ->
    return (field.val() != "")
    
window.ValidityLibrary.Validators.Required = Required
