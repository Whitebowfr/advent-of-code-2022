import { day2 } from "./@lib";

enum Shape {
    ROCK = 1,
    PAPER,
    SCISSORS
}

enum Outcomes {
    LOSS = 0,
    DRAW = 3,
    WIN = 6
}

function parseDataPtOne(data: string): [Shape, Shape][] {
    const shapeDecrypt: Record<string, Shape> = {
        A: Shape.ROCK,
        B: Shape.PAPER,
        C: Shape.SCISSORS,
        X: Shape.ROCK,
        Y: Shape.PAPER,
        Z: Shape.SCISSORS
    }

    return data.split("\n").map(x => x.split(" ").map(y => shapeDecrypt[y]) as [Shape, Shape])
}

function parseDataPtTwo(data: string): [Shape, Outcomes][] {
    const shapeDecrypt: Record<string, Shape|Outcomes> = {
        A: Shape.ROCK,
        B: Shape.PAPER,
        C: Shape.SCISSORS,
        X: Outcomes.LOSS,
        Y: Outcomes.DRAW,
        Z: Outcomes.WIN
    }

    return data.split("\n").map(x => x.split(" ").map(y => shapeDecrypt[y]) as [Shape, Outcomes])
}


function decodeWin(opponent: Shape, player: Shape): Outcomes {
    switch(opponent) {
        case Shape.ROCK:
            switch(player) {
                case Shape.ROCK: return Outcomes.DRAW
                case Shape.PAPER: return Outcomes.WIN
                default: return Outcomes.LOSS
            }
        case Shape.PAPER:
            switch(player) {
                case Shape.ROCK: return Outcomes.LOSS
                case Shape.PAPER: return Outcomes.DRAW
                default: return Outcomes.WIN
            }
        case Shape.SCISSORS:
            switch(player) {
                case Shape.ROCK: return Outcomes.WIN
                case Shape.PAPER: return Outcomes.LOSS
                default: return Outcomes.DRAW
            }
    }
}

function getWinningType(opponent: Shape, outcome: Outcomes): Shape {
    switch(outcome) {
        case Outcomes.WIN:
            switch(opponent) {
                case Shape.ROCK: return Shape.PAPER
                case Shape.PAPER: return Shape.SCISSORS
                default: return Shape.ROCK
            }
        case Outcomes.DRAW: return opponent
        case Outcomes.LOSS: 
            switch(opponent) {
                case Shape.ROCK: return Shape.SCISSORS
                case Shape.PAPER: return Shape.ROCK
                default: return Shape.PAPER
            }
    }
}

function partOne(data: string) {
    let matchData = parseDataPtOne(data)
    let totalScore = 0
    for (let match of matchData) {
        totalScore += (decodeWin(...match) + match[1])
    }
    console.log(totalScore)
    return totalScore
}

function partTwo(data: string) {
    let matchData = parseDataPtTwo(data)
    let totalScore = 0
    for (let match of matchData) {
        totalScore += match[1] + getWinningType(...match)
    }
    console.log(totalScore)
    return totalScore
}