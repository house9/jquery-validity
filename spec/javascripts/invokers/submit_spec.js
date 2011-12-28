describe("Invokers::Sumbit", function() {
  
  beforeEach(function() {
    window.ValidityLibrary.isDebugEnabled = true;    
    invoker = new window.ValidityLibrary.Invokers.Submit();
  });
    
  describe("watch", function() {
  
    it("should bind submit to the form invoker callback", function() {
      loadFixtures('invoker_submit_fixture.html');
      var form = jQuery("#test-fixture");
      invoker.watch(form);
      expect(form).toHandle("submit", invoker.callback);
    });
  
  });  
  
});
