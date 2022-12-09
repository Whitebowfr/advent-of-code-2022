import { day8, parseAsInts, Map2D, DirectionMarker, updateCoords } from "./@lib";

interface tree {
    value: number;
    hiddenFrom: DirectionMarker[];
    scenicScore: number;
}
function parseForest(inp: string): tree[][] {
    return inp.split("\n").map(x => x.split("").map(y => {
        return { value: parseInt(y), hiddenFrom: [], scenicScore: 1 }
    }))
}

function partOne(data: string) {
    let forest = parseForest(data)

    let totalVisibleTrees = 0
    forest.forEach((row, yIndex) => {
        row.forEach((tree, xIndex) => {
            if ((yIndex === 0 || yIndex === forest.length - 1) || (xIndex === 0 || xIndex === forest[0].length - 1)) {
                totalVisibleTrees += 1
            } else {
                let coords: [number, number] = [xIndex, yIndex]
                for (let direction of Object.values(DirectionMarker).slice(4, 8)) {
                    if (isTreeVisible(forest, coords, direction as DirectionMarker)) {
                        tree.hiddenFrom.push(direction as DirectionMarker)
                    }
                }
                if (tree.hiddenFrom.length !== 0) {
                    totalVisibleTrees += 1
                }
            }
        })
    })
    console.log(totalVisibleTrees)
}

function partTwo(data: string) {
    let forest = parseForest(data)

    forest.forEach((row, yIndex) => {
        row.forEach((tree, xIndex) => {
            let coords: [number, number] = [xIndex, yIndex]
            for (let direction of Object.values(DirectionMarker).slice(4, 8)) {
                tree.scenicScore *= getTreesVisible(forest, updateCoords(coords, direction as DirectionMarker), direction as DirectionMarker)
            }
            console.log(tree, coords)
        })
    })

    console.log(forest)

}

function isTreeVisible(forest: tree[][], coords: [number, number], dir: DirectionMarker) {
    let isVisible = true
    let originalValue = forest[coords[1]][coords[0]].value
    while (forest[updateCoords(coords, dir)[1]]?.[updateCoords(coords, dir)[0]]) {
        coords = updateCoords(coords, dir)
        if (originalValue <= forest[coords[1]][coords[0]].value) {
            isVisible = false
            break
        }
    }
    return isVisible
}

function getTreesVisible(forest: tree[][], coords: [number, number], dir: DirectionMarker) {
    let treesVisible = 1
    while (forest[updateCoords(coords, dir)[1]]?.[updateCoords(coords, dir)[0]]) {
        let ogCoords = [...coords]
        coords = updateCoords(coords, dir)
        console.log(ogCoords, forest[ogCoords[1]][ogCoords[0]].value, coords, forest[coords[1]][coords[0]].value, treesVisible)

        if (forest[ogCoords[1]][ogCoords[0]].value < forest[coords[1]][coords[0]].value) {
            treesVisible += 1
        } else {
            break
        }
    }
    return treesVisible
}

partTwo(`30373
25512
65332
33549
35390`)