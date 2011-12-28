describe("Registry", function() {
  var registry = null;

  beforeEach(function() {
    registry = new window.ValidityLibrary.Registry();
  });

  describe("presenter", function() {

    it("should return alert", function() {
      expect(registry.getPresenter("alert")).toBeDefined();
    });

    it("should return inline", function() {
      expect(registry.getPresenter("inline")).toBeDefined();
    });

    it("should return summary", function() {
      expect(registry.getPresenter("summary")).toBeDefined();
    });
    
    it("should throw error when not found", function() {
      expect(function () { registry.getPresenter("invalid-test") }).toThrow();
    });
    
  });
  
  describe("invoker", function() {

    it("should return submit", function() {
      expect(registry.getInvoker("submit")).toBeDefined();
    });

    it("should return blur", function() {
      expect(registry.getInvoker("blur")).toBeDefined();
    });
    
    it("should throw error when not found", function() {
      expect(function () { registry.getInvoker("invalid-test") }).toThrow();
    });
    
  });  

});