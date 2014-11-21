/*describe('characterCtrl', function(){
  var scope = {};
  beforeEach(module('csApp'));
  beforeEach(inject(function($rootScope, $controller){
    //localStorage['globalMap'] = JSON.stringify({"0 0":{"x":"0","y":"0","terrain":"plains"}});
    scope = $rootScope.$new();
    characterCtrl = $controller('characterCtrl'){
      $scope: scope
    };
  }));
  it('should make attributes equal 10', function(){
    expect(scope.character.attributes.strength.value).toBe(10);
  });
});*/
describe("My First Test", function(){

  it("should be true", function(){
      expect(true).toBe(true);
  });
});