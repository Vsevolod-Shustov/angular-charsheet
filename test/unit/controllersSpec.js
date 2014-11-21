describe('MapCtrl', function(){
  var scope = {};
  beforeEach(angular.mock.module('csApp'));
  /*beforeEach(angular.mock.inject(function($rootScope, $controller){
    localStorage['globalMap'] = JSON.stringify({"0 0":{"x":"0","y":"0","terrain":"plains"}});
    scope = $rootScope.$new();
    $controller('MapCtrl', {$scope: scope});
  }));*/
  it('should make attributes equal 10', function(){
    expect(scope.character.attributes.strength.value).toBe(10);
  });
});