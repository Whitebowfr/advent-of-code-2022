import { day3 } from "./@lib";
import { getCommonItems, sum } from "./@lib";

function getPriority(item: string): number {
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.indexOf(item) + 1
}

function partOne(rucksacks: string): number {
    let doubleItems: string[] = rucksacks.split("\n").map(rucksack => rucksack.split("")).map(rucksack => {
        let firstCompartment = rucksack.splice(0, rucksack.length / 2)
        let secondCompartment = rucksack
        return getCommonItems(true, firstCompartment, secondCompartment)
    })
    
    let itemPriorities: number[] = doubleItems.map(item => getPriority(item))
    let sumOfPriorities = sum(itemPriorities)

    console.log(sumOfPriorities)
    return sumOfPriorities
}

function partTwo(rucksacks: string): number {
    let rucksackPerGroup = rucksacks.split("\n")

    // Maps the 1D array to a 2D array of shape 3xN, with N the number of rucksacks
    let groups: string[][] = []
    for (let i = 0; i < rucksackPerGroup.length; i += 3) {
        groups.push([rucksackPerGroup[i], rucksackPerGroup[i + 1], rucksackPerGroup[i + 2]])
    }

    let priorities = groups.map(x => getPriority(getCommonItems(true, ...x.map(str => str.split("")))))
    console.log(sum(priorities))

    return sum(priorities)
}

const partOneOneLiner = (data: string) => 
    data.split("\n")
    .map(x => x.split(""))
    .map(x => x.splice(0, x.length / 2) // Separate compartments
        .filter(y => x.includes(y))[0]) // Gets every item that appears in both compartments
    .map(x => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(x) + 1) // Gets the priority of the item
    .reduce((a, b) => a + b)

const partTwoOneLiner = (data: string) => 
    data.split("\n")
    .map((x, indx) => indx % 3 == 0 ? // Only executes this command once every three rucksack
        x.split("").filter(y => // Iterate over each element of every 3rd rucksack
            [data.split("\n")[indx + 1].split(""), data.split("\n")[indx + 2].split("")] // Gets the items in the next two rucksacks
                .every(z => z.includes(y))) // Checks if the element is in them
        [0] // Only get the first occurence of it
        : null)
    .filter(x => typeof x === "string") // Filter null elements
    .map(x => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(x as string) + 1) // Get priority
    .reduce((a, b) => a + b)