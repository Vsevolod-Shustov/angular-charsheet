describe('homepage', function() {
  beforeEach(function() {
    browser.get('http://localhost:8001/app/index.html');
  });

  it('should load the home page', function() {
    expect(browser.getTitle()).toBe('Character Sheet');
  });
});