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

    [100, 500, 1000].forEach(cacheNom => {
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

    // let denominationNeedForClient = Map<number, number>()
    // let iNominal = 0 // тупо счетчик
    // let countOfCurrentNominalOfClient = 0
    // while (remainder > 0) {
    //     console.log(remainder);
        
    //     const maxNominal = cache.keySeq().toArray().reverse()
    //     const countOfCurrentNominalInBank = cache.get(maxNominal[iNominal])!
    //     if (maxNominal[iNominal] <= remainder && countOfCurrentNominalInBank > 0) {
    //         remainder -= maxNominal[iNominal]
    //         countOfCurrentNominalOfClient++
    //         cache = cache.set(maxNominal[iNominal], countOfCurrentNominalInBank-1)
    //         denominationNeedForClient.set(maxNominal[iNominal], countOfCurrentNominalOfClient)
    //     } else {
    //         iNominal++
    //         countOfCurrentNominalOfClient = 0
    //     }
    // }

    // denominationNeedForClient.forEach((el) => console.log(el))
    

    // return denominationNeedForClient

}


