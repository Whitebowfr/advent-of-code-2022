import { day5, parseAsInts } from "./@lib";

type crate = string

function parseInitialCratesPlacement(map: string): crate[][] {
    let output: crate[][] = [...new Array(9).fill(null).map(x => [])]
    map.split("\n").reverse().forEach(z => {
        let re = /[A-Z]/g
        let match: RegExpExecArray|null
        while ((match = re.exec(z)) != null) {
            output[(match.index - 1) / 4].push(match[0])
        }
    })
    return output
}

function partOne(data: string): string {
    let crates = parseInitialCratesPlacement(data.split("1")[0])
    data.split("\n\n")[1].split("\n").forEach(craneInstruction => {
        let parsedInstruction = parseAsInts(craneInstruction.match(/[0-9]+/gm) as string[])
        let [quantity, originalStack, targetStack] = parsedInstruction
        for (let index = 0; index < quantity; index++) {
            let crateMoved = crates[originalStack - 1].pop()
            crates[targetStack - 1].push(crateMoved as string)
        }
    })
    console.log(crates.map(x => x[x.length - 1]).join(""))
    return crates.map(x => x[x.length - 1]).join("")
}

function partTwo(data: string): string {
    let crates = parseInitialCratesPlacement(data.split("1")[0])
    data.split("\n\n")[1].split("\n").forEach(craneInstruction => {
        let parsedInstruction = parseAsInts(craneInstruction.match(/[0-9]+/gm) as string[])
        let [quantity, originalStack, targetStack] = parsedInstruction
        let pickedUpCrates = crates[originalStack - 1].splice(crates[originalStack - 1].length - quantity, Infinity)
        crates[targetStack - 1].push(...pickedUpCrates)
    })
    console.log(crates.map(x => x[x.length - 1]).join(""))
    return crates.map(x => x[x.length - 1]).join("")
}

partTwo(day5)