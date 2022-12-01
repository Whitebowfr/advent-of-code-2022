import { day1 } from "./@lib";
import { sum, parseStringAsInts } from "./@lib";

function addCalories(data: string): number[] {
    let dataSplitted: string[] = data.split("\n\n")
    let output: number[] = dataSplitted.map(x => sum(parseStringAsInts(x)))
    return output.sort((a, b) => a > b ? -1 : 1)
}

function partOne(data: string): number|void {
    let output = addCalories(data)
    console.log(output[0])
    return output[0]
}

function partTwo(data: string): number|void {
    let out = addCalories(data)
    console.log(sum(out, 3))
    return sum(out, 3)
}
partTwo(day1)