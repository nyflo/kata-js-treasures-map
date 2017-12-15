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
        a.move();
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
        nextMove: function () {
            return this.moves[0];
        },
        move() {
            switch (this.nextMove()) {
                case 'A':
                    this.advance();
                    break;
                case 'D':
                    this.turnRight();
                    break;
                case 'G':
                    this.turnLeft();
                    break;
            }
            this.moves.shift();
        },
        advance() {
            if (this.orientation === 'N') {
                this.y -= 1;
            } else if (this.orientation === 'S') {
                this.y += 1;
            } else if (this.orientation === 'E') {
                this.x += 1;
            } else if (this.orientation === 'W') {
                this.x -= 1;
            } else {
                throw Error("Invalid orientation: " + this.orientation);
            }
        },
        turnLeft() {
            if (this.orientation === 'N') {
                this.orientation = 'W';
            } else if (this.orientation === 'S') {
                this.orientation = 'E';
            } else if (this.orientation === 'E') {
                this.orientation = 'N';
            } else if (this.orientation === 'W') {
                this.orientation = 'S';
            } else {
                throw Error("Invalid orientation: " + this.orientation);
            }
        },
        turnRight() {
            if (this.orientation === 'N') {
                this.orientation = 'E';
            } else if (this.orientation === 'S') {
                this.orientation = 'W';
            } else if (this.orientation === 'E') {
                this.orientation = 'S';
            } else if (this.orientation === 'W') {
                this.orientation = 'N';
            } else {
                throw Error("Invalid orientation: " + this.orientation);
            }
        }
    };
}



