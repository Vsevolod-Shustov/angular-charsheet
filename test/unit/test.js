describe('characterCtrl', function(){
  var scope = {};
  beforeEach(module('csApp'));
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    $controller('characterCtrl', {$scope: scope});
    scope.loadCharacter();
  }));
  it('should load attributes', function(){
    expect(scope.character.attributes.strength.value).toBe(12);
    expect(scope.character.attributes.dexterity.value).toBe(14);
    expect(scope.character.attributes.constitution.value).toBe(16);
    expect(scope.character.attributes.intelligence.value).toBe(18);
    expect(scope.character.attributes.wisdom.value).toBe(20);
    expect(scope.character.attributes.charisma.value).toBe(22);
  });
  it('should calculate attributes\' modifiers', function(){
    expect(scope.character.attributes.strength.mod).toBe(1);
    expect(scope.character.attributes.dexterity.mod).toBe(2);
    expect(scope.character.attributes.constitution.mod).toBe(3);
    expect(scope.character.attributes.intelligence.mod).toBe(4);
    expect(scope.character.attributes.wisdom.mod).toBe(5);
    expect(scope.character.attributes.charisma.mod).toBe(6);
  });
});
/*describe("My First Test", function(){

  it("should be true", function(){
      expect(true).toBe(true);
  });
});*/