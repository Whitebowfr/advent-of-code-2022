import { day7 } from "./@lib";

class Directory {
    name: string
    childrens: Directory[]
    fileSize: number
    parentDirectory: Directory|null
    isFile: boolean

    constructor(name: string, parent: Directory|null, isFile: boolean) {
        this.name = name
        this.childrens = []
        this.fileSize = 0
        this.parentDirectory = parent
        this.isFile = isFile
    }

    addChildren(...children: Directory[]) {
        this.childrens.push(...children)
        this.updateSize()
    }

    getSize(): number {
        return this.fileSize
    }

    // Calculates the size of all subdirectories and updates the parent directory
    updateSize() {
        let total = 0
        for (let child of this.childrens) {
            total += child.getSize()
        }
        this.setRawSize(total)
        if (this.parentDirectory) {
            this.parentDirectory.updateSize()
        }
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
}

// This functions maps all subdirectories and creates them
function parseLsOutput(out: string, currentDir: Directory) {
    let finalDirectory: Directory[] = []

    // Loops trough all of the outputs lines
    out.split("\n").filter(x => x !== "").forEach(x => {
        let dir = new Directory(x.split(" ")[1], currentDir, !x.includes("dir"))
        if (dir.isFile) {
            dir.setRawSize(parseInt(x.split(" ")[0]))
        }
        finalDirectory.push(dir)
    })

    return finalDirectory
}

function parseDataTree(data: string) {
    let instructionsAndReturnValues = data.split("$ ")

    // Removes the first empty line and the cd / command 
    instructionsAndReturnValues.shift()
    instructionsAndReturnValues.shift()

    let dataTree = new Directory("/", null, false)
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
        if (!dir.isFile && dir.getSize() < 100000) {
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
        if (!dir.isFile && dir.getSize() >= spaceNeeded) {
            possibleDirectories.push(dir.getSize())
        }
        dir.childrens.forEach(x => {
            crawlDataTree(x)
        })
    }

    crawlDataTree(dataTree)
    console.log(possibleDirectories.sort((a, b) => a - b)[0])
}