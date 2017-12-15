var chai = require('chai');
var assert = chai.assert;
var Rover = require('../rover');
var World = require('../world');

describe('mars rover', function() {
  describe('initialization of rover', function() {
    var testRover;

    before(function() {
      testRover = new Rover([2,3], 'testdirection');
    })

    it('should set the initial location', function() {
      assert.equal(testRover.location.x, 2);
      assert.equal(testRover.location.y, 3);
    });

    it('should set the facing direction', function() {
      assert.equal(testRover.facing, 'testdirection');
    });
  });

  describe('currentLocation', function() {
    it('should return array with x and y location values', function() {
      var testRover = new Rover([2,3], 'testdirection');
      assert.deepEqual(testRover.currentLocation(), [2,3]);
    });
  });

  describe('giveCommands', function() {
    it('should take character array and set commands', function() {
      var testRover = new Rover([1,1], 'W');
      var testCommands = ['a','d','d','s'];
      testRover.giveCommands(testCommands);
      assert.equal(testRover.commands, testCommands);
    });
  });

  describe('rover movement', function() {
    describe('command given is f', function() {
      it('should increase x location by 1 when facing E', function() {
        var testRover = new Rover([1,1], 'E');
        testRover.giveCommands(['f']);
        assert.deepEqual(testRover.currentLocation(), [2,1]);
      });

      it('should decrease x location by 1 when facing W', function() {
        var testRover = new Rover([2,1], 'W');
        testRover.giveCommands(['f']);
        assert.deepEqual(testRover.currentLocation(), [1,1]);
      });

      it('should increase y location by 1 when facing S', function() {
        var testRover = new Rover([1,1], 'S');
        testRover.giveCommands(['f']);
        assert.deepEqual(testRover.currentLocation(), [1,2]);
      });

      it('should decrease y location by 1 when facing N', function() {
        var testRover = new Rover([1,2], 'N');
        testRover.giveCommands(['f']);
        assert.deepEqual(testRover.currentLocation(), [1,1]);
      })
    });

    describe('command given is b', function() {
      it('should decrease x location by 1 when facing E', function() {
        var testRover = new Rover([2,1], 'E');
        testRover.giveCommands(['b']);
        assert.deepEqual(testRover.currentLocation(), [1,1]);
      });

      it('should increase x location by 1 when facing W', function() {
        var testRover = new Rover([1,1], 'W');
        testRover.giveCommands(['b']);
        assert.deepEqual(testRover.currentLocation(), [2,1]);
      });

      it('should decrease y location by 1 when facing S', function() {
        var testRover = new Rover([1,2], 'S');
        testRover.giveCommands(['b']);
        assert.deepEqual(testRover.currentLocation(), [1,1]);
      });

      it('should increase y location by 1 when facing N', function() {
        var testRover = new Rover([1,1], 'N');
        testRover.giveCommands(['b']);
        assert.deepEqual(testRover.currentLocation(), [1,2]);
      })
    });

    describe('command given is l', function() {
      it('should change facing direction to N when facing E', function() {
        var testRover = new Rover([1,1], 'E');
        testRover.giveCommands(['l']);
        assert.deepEqual(testRover.facing, 'N');
      });

      it('should change facing direction to E when facing S', function() {
        var testRover = new Rover([1,1], 'S');
        testRover.giveCommands(['l']);
        assert.deepEqual(testRover.facing, 'E');
      });

      it('should change facing direction to S when facing W', function() {
        var testRover = new Rover([1,1], 'W');
        testRover.giveCommands(['l']);
        assert.deepEqual(testRover.facing, 'S');
      });

      it('should change facing direction to W when facing N', function() {
        var testRover = new Rover([1,1], 'N');
        testRover.giveCommands(['l']);
        assert.deepEqual(testRover.facing, 'W');
      });
    });

    describe('command given is r', function() {
      it('should change facing direction to S when facing E', function() {
        var testRover = new Rover([1,1], 'E');
        testRover.giveCommands(['r']);
        assert.deepEqual(testRover.facing, 'S');
      });

      it('should change facing direction to W when facing S', function() {
        var testRover = new Rover([1,1], 'S');
        testRover.giveCommands(['r']);
        assert.deepEqual(testRover.facing, 'W');
      });

      it('should change facing direction to N when facing W', function() {
        var testRover = new Rover([1,1], 'W');
        testRover.giveCommands(['r']);
        assert.deepEqual(testRover.facing, 'N');
      });

      it('should change facing direction to E when facing N', function() {
        var testRover = new Rover([1,1], 'N');
        testRover.giveCommands(['r']);
        assert.deepEqual(testRover.facing, 'E');
      });
    });

    describe('wrapping around a grid', function() {
      it('should set grid size during initialization', function() {
        var testRover = new Rover([1,1], 'N');
        assert.equal(testRover.world.grid.x, 10);
        assert.equal(testRover.world.grid.y, 10);
      });

      it('should set rover location wrap vertically if move below bottom of grid', function() {
        var testRover = new Rover([1,8], 'N');
        testRover.giveCommands(['b', 'b', 'b']);
        assert.deepEqual(testRover.currentLocation(), [1,1])
      });

      it('should set rover location wrap vertically if move above top of grid', function() {
        var testRover = new Rover([1,2], 'N');
        testRover.giveCommands(['f', 'f']);
        assert.deepEqual(testRover.currentLocation(), [1,10])
      });

      it('should set rover location wrap horizontally if move off grid to the left', function() {
        var testRover = new Rover([2,2], 'N');
        testRover.giveCommands(['l', 'f', 'f']);
        assert.deepEqual(testRover.currentLocation(), [10,2])
      });

      it('should set rover location wrap horizontally if move off grid to the right', function() {
        var testRover = new Rover([9,2], 'N');
        testRover.giveCommands(['r', 'f', 'f']);
        assert.deepEqual(testRover.currentLocation(), [1,2])
      });
    });

    describe('world', function() {
      it ('should set obstacles at initialization', function() {
        var testWorld = new World([10,10], [[2,2], [6,6]]);
        assert.deepEqual(testWorld.grid, {x: 10, y: 10});
        assert.deepEqual(testWorld.obstacles, [{x: 2, y:2},{x:6, y:6}]);
      })
    })

    describe('collision detection', function() {
      it('should stop if next move would cause a collision', function() {
        var testWorld = new World([10,10], [[3,3], [6,6]]);
        var testRover = new Rover([1,1], 'N', testWorld);
        testRover.giveCommands(['b', 'b', 'r', 'f', 'f', 'f', 'f']);
        assert.deepEqual(testRover.currentLocation(), [2,3]);
      });
    });
  });
});