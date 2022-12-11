import { day10, map1Dto2D } from "./@lib"

function partOne(data: string) {
    let cycle = 0
    let xRegister = 1
    let sum = 0

    const skipCycle = () => {
        cycle += 1
        if ([20, 60, 100, 140, 180, 220].indexOf(cycle) !== -1) {
            console.log(`${cycle} : ${xRegister}, ${xRegister * cycle}`)
            sum += xRegister * cycle
        }
    }
    const addSecondCycle = (val: number) => {
        skipCycle()
        xRegister += val
    }

    data.split("\n").forEach(instruction => {
        if (instruction.includes("noop")) {
            skipCycle()
        } else {
            skipCycle()
            addSecondCycle(parseInt(instruction.split(" ")[1]))
        }
    })

    console.log(`Total sum : ${sum}`)
}

function partTwo(data: string) {
    let cycle = 0
    let xRegister = 1
    let pixels = [...new Array(40*6).fill(" ")]

    const skipCycle = () => {
        pixels[cycle] = [xRegister - 1, xRegister, xRegister + 1].indexOf(cycle%40) !== -1 ? "⬜" : "⬛"
        cycle += 1
    }
    const addSecondCycle = (val: number) => {
        skipCycle()
        xRegister += val
    }

    data.split("\n").forEach(instruction => {
        if (instruction.includes("noop")) {
            skipCycle()
        } else {
            skipCycle()
            addSecondCycle(parseInt(instruction.split(" ")[1]))
        }
    })

    printPixels(pixels)
}

function printPixels(pix: string[]) {
    let str = map1Dto2D(pix, 40).map(x => x.join(" "))
    console.log(str.join("\n"))
    
}

partTwo(day10)