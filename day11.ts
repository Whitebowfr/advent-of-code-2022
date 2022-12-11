import { day11, parseAsInts, sort, sum } from "./@lib";

interface Item {
    worryLevel: number;
}

class Game {
    monkeys: Monkey[] = []
    commonDivisor: number = 1

    constructor(initData: string, isPartOne: boolean) {
        initData.split("Monkey ").forEach((x, idx) => {
            if (x) {
                let startingItems = parseAsInts(x.split("\n")[1].replace("Starting items: ", "").split(", "))
                let operation = x.split("\n")[2].replace("Operation: ", "")
                let test = x.split("Test: ")[1]
                this.commonDivisor *= parseInt(test.split("\n")[0].split("divisible by ")[1])
                this.monkeys.push(new Monkey(idx - 1, startingItems, operation, test, this, isPartOne))
            }
        })
    }

    playRound() {
        for (let monkey of this.monkeys) {
            monkey.play()
        }
    }

    printItems() {
        console.log(this.monkeys.map(x => x.items.map(y => y.worryLevel)))
    }

    addItemToMonkey(targetId: number, item: Item) {
        this.monkeys[targetId].items.push(item)
    }
}

class Monkey {
    id: number;
    items: Item[];
    operation: Function;
    condition: Function;
    numberOfInspections: number = 0;
    parentGame: Game


    constructor(id: number, items: number[], operation: string, condition: string, parent: Game, isPartOne: boolean) {
        this.id = id
        this.items = items.map(x => {return {worryLevel: x}})
        this.operation = (lvl: number) => {return eval(operation.split("= ")[1].replaceAll("old", lvl.toString()))}
        this.condition = (lvl: number) => {
            if (isPartOne) {
                lvl = Math.floor(lvl / 3)
            }
            let divisionNumber = parseInt(condition.split("\n")[0].split("divisible by ")[1])
            if (lvl % divisionNumber === 0) {
                this.throwToMonkey(parseInt(condition.split("\n")[1].split("throw to monkey ")[1]), {worryLevel: lvl })
                return
            }
            this.throwToMonkey(parseInt(condition.split("\n")[2].split("throw to monkey ")[1]), {worryLevel: lvl})
        }
        this.parentGame = parent;
    }

    play() {
        while (this.items.length) {
            let item = this.items.shift() as Item
            this.inspect(item)
        }
    }

    inspect(item: Item) {
        this.numberOfInspections += 1
        item.worryLevel = this.operation(item.worryLevel)
        item.worryLevel = item.worryLevel % this.parentGame.commonDivisor
        this.condition(item.worryLevel)
    }

    throwToMonkey(targetId: number, item: Item) {
        this.parentGame.addItemToMonkey(targetId, item)
    }
}

function partOne(data: string) {
    let game = new Game(data, true)
    for (let index = 0; index < 20; index++) {
        game.playRound()
    }
    let monkeys = sort(game.monkeys, false, "numberOfInspections")
    console.log(monkeys[0] * monkeys[1])
}

// Not very good but it runs in about 800ms so good enough
function partTwo(data: string) {
    let game = new Game(data, false)
    for (let index = 0; index < 10000; index++) {
        game.playRound()
        if (index % 1000 === 0) {
            let monkeys = sort(game.monkeys, false, "numberOfInspections")
            console.log(index + ": " + monkeys)
        }
    }
    let monkeys = sort(game.monkeys, false, "numberOfInspections")
    console.log(monkeys)
    console.log(monkeys[0] * monkeys[1])
}
