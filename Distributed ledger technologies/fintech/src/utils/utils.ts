import { Map } from "immutable"
import { reaction } from "mobx";

export function numDigits(x: number) {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


export function randomCacheGenerator() {
    let cache = Map<number, number>();

    [100, 500, 1000, 5000].forEach(cacheNom => {
        cache = cache.set(cacheNom, getRandomInt(2, 10))
    });
    return cache
}


export function isHasChange(cache: Map<number, number>, sum: number) {
    // найти максимальное число в кеше, которое меньше, чем сум
    // вычесть из сум это число, повторить пока остаток не будет == 0
    let remainder = sum
    
    //  допустим нам нужно покрыть 5к
    //  самые крупные купюры >= 5к ?
    // вкинем одну, сколько останется?
    // следующую куплюру

    let denominationNeedForClient = Map<number, number>()
    let iNominal = 0 // тупо счетчик
    let countOfCurrentNominalOfClient = 0
    while (remainder > 0) {
        const maxNominal = cache.keySeq().toArray().reverse()
        const countOfCurrentNominalInBank = cache.get(maxNominal[iNominal])!
        if (maxNominal[iNominal] <= remainder && countOfCurrentNominalInBank > 0) {
            remainder -= maxNominal[iNominal]
            countOfCurrentNominalOfClient++
            cache = cache.set(maxNominal[iNominal], countOfCurrentNominalInBank-1)
            denominationNeedForClient = denominationNeedForClient.set(maxNominal[iNominal], countOfCurrentNominalOfClient)
        } else {
            iNominal++
            countOfCurrentNominalOfClient = 0
        }
        if (iNominal >= maxNominal.length) {
            return false
        }
        console.log(maxNominal[iNominal], countOfCurrentNominalInBank, remainder)
    }

    return denominationNeedForClient.size === 0 ? false : denominationNeedForClient

}

export function subtractCacheForClient(cache: Map<number, number>, subClientCache: Map<number, number>) {
    return cache.mapEntries(([nominal, count]) => {
        const spentNominals = subClientCache.get(nominal)
        if (spentNominals) {
            return [nominal, count - spentNominals]
        } else {
            return [nominal, count]
        }
    })
}

export function exhaustiveCheck( param: never ) {
    throw new Error(`Unhandled value: ${param}`)
}