import { day2, getIndexCircular, sum } from "./@lib";

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
    if (opponent === player) return Outcomes.DRAW
    if (getWinningType(opponent, Outcomes.LOSS) === player) return Outcomes.LOSS
    return Outcomes.WIN
}

function getWinningType(opponent: Shape, outcome: Outcomes): Shape {
    return getIndexCircular(
        Object.values(Shape).slice(3, 6), 
        opponent 
            + ((outcome - 6) / 3))
    // This is so that when the outcome is 6, it removes 0, when it's 3, it removes 1, and when it's 0, it removes 2.
}

function partOne(data: string) {
    let totalScore = sum(parseDataPtOne(data).map(x => decodeWin(...x) + x[1]))
    console.log(totalScore)
    return totalScore
}

function partTwo(data: string) {
    let totalScore = sum(parseDataPtTwo(data).map(x => (x[1] + getWinningType(...x))))
    console.log(totalScore)
    return totalScore
}

partOne(day2)

// pretty sure one-liners are impossible
// 1 hour later, I can safely say that it was possible.

const partTwoOneLiner = (data: string) => 
    data
    .split("\n")
    .map(x => x
        .split(" ")
        .map(y => 
            ["A", "B", "C"].indexOf(y) === -1 ? 
                ["X", "Y", "Z"].indexOf(y) * 3 
                : ["A", "B", "C"].indexOf(y) + 1))
    .map(x => x[1] 
            + (x[0] + x[1] / 3 
                + (x[0] + x[1] / 3 >= 2 ? -2 : 1)) 
            % (x[0] + x[1] / 3 >= 2 ? 3 : Infinity)
            + 1) // I don't even know wtf I just wrote, don't ask me how it works
    .reduce((a, b) => a + b)


    
console.log(partTwoOneLiner(day2))