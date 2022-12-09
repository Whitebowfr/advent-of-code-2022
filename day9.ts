import { day9, DirectionMarker, updateCoords, coords, getEuclidianDistance, getOppositeDirectionMarker, getDirectionFromString, getMarkerDifferences } from "./@lib";

class Ropes {
    position: coords = [0, 0]
    parent: Ropes|null
    children: Ropes|null = null

    constructor(parent: Ropes|null) {
        this.parent = parent
    }

    updatePos(dir: DirectionMarker) {

        if (this.parent !== null) {
            if (getEuclidianDistance(this.position, this.parent.position) > 2) {
                let previousPos = [...this.position]
                this.position = updateCoords(this.position, getOppositeDirectionMarker(dir))
                console.log(previousPos, this.position)
                let directions = getMarkerDifferences(this.position, previousPos as coords)
                directions.forEach(x => {
                    this.children?.updatePos(x)
                })
                return
            }
        } else {
            this.position = updateCoords(this.position, dir)
        }
        if (this.children !== null) {
            this.children.updatePos(dir)
        }
    }

    setChild(child: Ropes) {
        this.children = child
    }
}

function partOne(data: string) {
    let headRope = new Ropes(null)
    let tailRope = new Ropes(headRope)
    headRope.setChild(tailRope)

    let tailPositions: string[] = []
    data.split("\n").forEach(x => {
        let dir = getDirectionFromString(x.split(" ")[0])
        if (dir !== undefined) {
            for (let index = 0; index < parseInt(x.split(" ")[1]); index++) {
                headRope.updatePos(dir)
                tailPositions.push(tailRope.position.join("-"))
            }
        }
    })
    // Removes duplicates
    let removedDuplicates = new Set(tailPositions)
    console.log([...removedDuplicates].length)
}

function partTwo(data: string) {
    let ropes = [new Ropes(null)]
    for (let index = 0; index < 9; index++) {
        ropes.push(new Ropes(ropes[index]))
        ropes[index].setChild(ropes[index + 1])
    }
    let tailPositions: string[] = []
    data.split("\n").forEach(x => {
        let dir = getDirectionFromString(x.split(" ")[0])
        if (dir !== undefined) {
            for (let index = 0; index < parseInt(x.split(" ")[1]); index++) {
                ropes[0].updatePos(dir)
                // console.log(ropes.map(x => x.position))
                tailPositions.push(ropes[9].position.join("-"))
            }
        }
    })

    // Removes duplicates
    let removedDuplicates = new Set(tailPositions)
    console.log([...removedDuplicates].length)
}

console.clear()

partTwo(`R 5
U 8`)