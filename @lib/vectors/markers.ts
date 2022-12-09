export enum DirectionMarker {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

export function updateCoords(coords: [number, number], direction: DirectionMarker): [number, number] {
    switch(direction) {
        case DirectionMarker.NORTH:
            return [coords[0], coords[1] - 1]
        case DirectionMarker.EAST:
            return [coords[0] + 1, coords[1]]
        case DirectionMarker.SOUTH:
            return [coords[0], coords[1] + 1]
        case DirectionMarker.WEST:
            return [coords[0] - 1, coords[1]]
    }
}