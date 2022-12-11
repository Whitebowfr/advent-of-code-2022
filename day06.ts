import { day6 } from "./@lib";

function bothParts(data: string, offset: number) {
    let letters = data.split("")

    for (let index = 0; index < letters.length - offset; index++) {
        const elements = [...letters].slice(index, index + offset)
        if (elements.length === [...new Set(elements)].length) {
            console.log(index + offset)
            return index + offset
        }
    }
}

// One-liners
const bothPartsOneLiner = (data: string, offset: number) => 
    data.split("").filter((x, indx) => data.length - indx > offset && [...new Set([...data].slice(indx, indx + offset))].length === [...data].slice(indx, indx + offset).length)

bothPartsOneLiner(day6, 14)