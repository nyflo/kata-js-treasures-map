"use strict";
(function main() {
    let output = resolveTreasures(
        readInput()
    );
    printData('Output', output);
})();

function printData(title, data) {
    console.log('##################################################################################################');
    console.log(title + ':\n');
    console.log(data);
}

function readInput() {
    let input = '# input\n' +
        'C - 3 - 4\n' +
        'M - 1 - 0\n' +
        'M - 2 - 1\n' +
        'T - 0 - 3 - 2\n' +
        'T - 1 - 3 - 3\n' +
        'A - Lara - 1 - 1 - S - AADADAGGA\n';
    printData('Input', input);
    return input
}

function resolveTreasures(input) {
    let lines = input.split('\n');

    let map = parse('C', lines, parseMap);
    let mountains = parse('M', lines, parseMountain);
    let treasures = parse('T', lines, parseTreasure);
    let adventurers = parse('A', lines, parseAdventurer);

    let a = adventurers[0];
    while (a.hasMove()) {
        let nextPos = a.nextPosition();
        if (!mountains.some(m => m.x == nextPos.x && m.y == nextPos.y))
            a.move(nextPos);
    }
    return {
        map: map,
        mountains: mountains,
        treasures: treasures,
        adventurers: adventurers
    };
}

function parse(starter, lines, parser) {
    return lines.filter(_ => _.startsWith(starter)).map(parser);
}

function parseMap(line) {
    let map = line.split(' - ');
    return {
        x: parseInt(map[1]),
        y: parseInt(map[2])
    };
}

function parseMountain(line) {
    let mountain = line.split(' - ');
    return {
        x: parseInt(mountain[1]),
        y: parseInt(mountain[2]),
    };
}

function parseTreasure(line) {
    let t = line.split(' - ');
    return {
        x: parseInt(t[1]),
        y: parseInt(t[2]),
        count: parseInt(t[3])
    };
}

function parseAdventurer(line) {
    let adventurer = line.split(' - ');
    return {
        name: adventurer[1],
        x: parseInt(adventurer[2]),
        y: parseInt(adventurer[3]),
        orientation: adventurer[4],
        moves: adventurer[5].split(''),
        hasMove() {
            return this.moves.length != 0;
        },
        nextMove() {
            return this.moves.shift();
        },
        nextPosition: function () {
            switch (this.nextMove()) {
                case 'A': return this.advancePosition();
                case 'D': return this.turnRightPosition();
                case 'G': return this.turnLeftPosition();
                default: throw Error("Invalid move: " + this.orientation);
            }
        },
        move(nextPos) {
            this.x = nextPos.x;
            this.y = nextPos.y;
            this.orientation = nextPos.orientation;
        },
        advancePosition() {
            if (this.orientation === 'N') {
                return {x:this.x, y:this.y-1, orientation:this.orientation};
            } else if (this.orientation === 'S') {
                return {x:this.x, y:this.y+1, orientation:this.orientation};
            } else if (this.orientation === 'E') {
                return {x:this.x+1, y:this.y, orientation:this.orientation};
            } else if (this.orientation === 'W') {
                return {x:this.x, y:this.y-1, orientation:this.orientation};
            } else {
                throw Error("Invalid orientation: " + this.orientation);
            }
        },
        turnLeftPosition() {
            let nextOrientation;
            if (this.orientation === 'N') {
                nextOrientation = 'W';
            } else if (this.orientation === 'S') {
                nextOrientation = 'E';
            } else if (this.orientation === 'E') {
                nextOrientation = 'N';
            } else if (this.orientation === 'W') {
                nextOrientation = 'S';
            } else {
                throw Error("Invalid orientation: " + this.orientation);
            }
            return {x:this.x, y:this.y, orientation:nextOrientation};
        },
        turnRightPosition() {
            let nextOrientation;
            if (this.orientation === 'N') {
                nextOrientation = 'E';
            } else if (this.orientation === 'S') {
                nextOrientation = 'W';
            } else if (this.orientation === 'E') {
                nextOrientation = 'S';
            } else if (this.orientation === 'W') {
                nextOrientation = 'N';
            } else {
                throw Error("Invalid orientation: " + this.orientation);
            }
            return {x:this.x, y:this.y, orientation:nextOrientation};
        }
    };
}



