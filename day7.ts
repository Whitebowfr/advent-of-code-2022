import { day7 } from "./@lib";

class Directory {
    name: string
    childrens: Directory[]
    fileSize: number
    parentDirectory: Directory|null

    constructor(name: string, parent: Directory|null) {
        this.name = name
        this.childrens = []
        this.fileSize = 0
        this.parentDirectory = parent
    }

    addChildren(...children: Directory[]) {
        this.childrens.push(...children)
    }

    getSize(): number {
        let total = this.fileSize
        for (let child of this.childrens) {
            total += child.getSize()
        }
        return total
    }

    getChildren(name: string): Directory|null {
        for (let dir of this.childrens) {
            if (dir.name === name && dir.fileSize === 0) return dir
        }
        return null
    }

    setRawSize(size: number) {
        this.fileSize = size
    }

    isDirectory() {
        return this.fileSize === 0
    }
}

function parseLsOutput(out: string, currentDir: Directory) {
    let finalDirectory: Directory[] = []
    out.split("\n").filter(x => x !== "").forEach(x => {
        let dir = new Directory(x.split(" ")[1], currentDir)
        if (!x.includes("dir")) {
            dir.setRawSize(parseInt(x.split(" ")[0]))
        }
        finalDirectory.push(dir)
    })
    return finalDirectory
}

function parseDataTree(data: string) {
    let instructionsAndReturnValues = data.split("$ ")
    instructionsAndReturnValues.shift()
    instructionsAndReturnValues.shift()
    let dataTree = new Directory("/", null)
    let currentDirectory = dataTree

    const interpretCommand = (command: string, output?: string) => {
        if (command.includes("ls") && output) {
            let listOfSubDirectories = parseLsOutput(output, currentDirectory)
            currentDirectory.addChildren(...listOfSubDirectories)
            return
        }
        if (command.includes("..")) {
            currentDirectory = currentDirectory.parentDirectory ?? currentDirectory
            return
        }
        currentDirectory = currentDirectory.getChildren(command.split("cd ")[1]) ?? currentDirectory
    }

    for (let instruction of instructionsAndReturnValues) {
        let command = instruction.split("\n")[0]
        let outputTemp = instruction.split("\n")
        outputTemp.shift()
        let output = outputTemp.join("\n")
        if (command) {
            interpretCommand(command, output)
        }
    }
    return dataTree
}

function partOne(data: string) {
    let dataTree = parseDataTree(data)
    let lessThan100000: Directory[] = []

    const crawlDataTree =  (dir: Directory) => {
        if (dir.isDirectory() && dir.getSize() < 100000) {
            lessThan100000.push(dir)
        }
        dir.childrens.forEach(x => {
            crawlDataTree(x)
        })
    }

    crawlDataTree(dataTree)
    let sum = 0
    lessThan100000.forEach(x => sum += x.getSize())
    console.log(sum)
    return sum
}

function partTwo(data: string) {
    let dataTree = parseDataTree(data)
    let spaceUnused = 70000000 - dataTree.getSize()
    let spaceNeeded = 30000000 - spaceUnused
    let possibleDirectories: number[] = []

    const crawlDataTree = (dir: Directory) => {
        if (dir.isDirectory() && dir.getSize() >= spaceNeeded) {
            possibleDirectories.push(dir.getSize())
        }
        dir.childrens.forEach(x => {
            crawlDataTree(x)
        })
    }

    crawlDataTree(dataTree)
    console.log(possibleDirectories.sort((a, b) => a - b))
}

partTwo(day7)