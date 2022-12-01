import { day1 } from "./@lib";
import { sum, parseStringAsInts, sort } from "./@lib";

function addCalories(data: string): number[] {
    let snacks: string[] = data.split("\n\n")
    let caloriesPerDeer: number[] = snacks.map(x => sum(parseStringAsInts(x)))
    return sort(caloriesPerDeer, false)
}

function partOne(data: string): number|void {
    let caloriesPerDeer = addCalories(data)
    console.log(caloriesPerDeer[0])
    return caloriesPerDeer[0]
}

function partTwo(data: string): number|void {
    let caloriesPerDeer = addCalories(data)
    console.log(sum(caloriesPerDeer, 3))
    return sum(caloriesPerDeer, 3)
}

// One-liners because why not
const oneLinerPartOne = (data: string) => data.split("\n\n")
    .map(x => x.split("\n")
        .map(y => parseInt(y))
        .reduce((a, b) => a + b))
    .sort((a, b) => b - a)[0]

const oneLinerPartTwo = (data: string) => data.split("\n\n")
    .map(x => x.split("\n")
        .map(y => parseInt(y))
        .reduce((a, b) => a + b))
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((a, b) => a + b)