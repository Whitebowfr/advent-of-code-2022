export function parseStringAsInts(str: string, separator="\n"): number[] {
    return parseAsInts(str.split(separator))
}

export function parseAsInts(a: any[]): number[] {
    return a.map(x => parseInt(x))
}