import { day4 } from "./@lib";
import { parseAsInts } from "./@lib";

type range = [number, number]

function partOne(list: string) {
    let ranges: range[][] = list.split("\n").map(x => x.split(",").map(y => parseAsInts(y.split("-")) as range)) // Mapping the input into number tuples
    let duplicateRanges = ranges.filter(x => checkRangeIncluded(x[0], x[1]))

    console.log(duplicateRanges.length)
    return duplicateRanges.length
}

function partTwo(list: string) {
    let ranges = list.split("\n").map(x => x.split(",").map(y => parseAsInts(y.split("-")) as range))
    let duplicateRanges = ranges.filter(x => !checkRangeOverlap(x[0], x[1]))
    
    console.log(duplicateRanges.length)
    return duplicateRanges.length
}

function checkRangeIncluded(rangeA: range, rangeB: range): boolean {
    return rangeA[0] >= rangeB[0] && rangeA[1] <= rangeB[1] || rangeA[0] <= rangeB[0] && rangeA[1] >= rangeB[1]
}

function checkRangeOverlap(rangeA: range, rangeB: range): boolean {
    return rangeA[1] < rangeB[0] || rangeA[0] > rangeB[1]
}

// One-liners
const partOneOneLiner = (data: string) =>
    data.split("\n")
    .map(x => x.split(",")
        .map(y => y.split("-")
            .map(z => parseInt(z))))
    .filter(x => (x[0][0] >= x[1][0] && x[0][1] <= x[1][1] || x[0][0] <= x[1][0] && x[0][1] >= x[1][1]))
    .length

const partTwoOneLiner = (data: string) =>
    data.split("\n")
    .map(x => x.split(",")
        .map(y => y.split("-")
            .map(z => parseInt(z))))
    .filter(x => (x[0][1] >= x[1][0] && x[0][0] <= x[1][1]))
    .length