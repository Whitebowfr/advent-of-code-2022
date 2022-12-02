export function parseStringAsInts(str: string, separator="\n"): number[] {
    return parseAsInts(str.split(separator))
}

export function parseAsInts(a: any[]): number[] {
    return a.map(x => parseInt(x))
}

export function sort(a: any[], ascending=true, property?: string): any[] {
    if (!property) {
        return a.sort((a, b) => ((a > b && ascending) || (a < b && !ascending)) ? 1 : -1)
    } else {
        if ((a[0] as Object).hasOwnProperty(property)) {
            return sort(a.map(x => x[property]), ascending)
        } else {
            throw new Error("Object does not have property " + property)
        }
    }
}

export function getIndexCircular(a: any[], indx: number): any {
    if (indx >= 0) {
        return a[indx % a.length]
    }
    return a[a.length + (indx % a.length)]
}