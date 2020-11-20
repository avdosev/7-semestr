import {Map} from "immutable"

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
    return  cache
}


export function isHasChange(cache: Map<number, number>, sum: number) {
    // найти максимальное число в кеше, которое меньше, чем сум
    // вычесть из сум это число, повторить пока остаток не будет == 0
    const denominationInDecOreder = cache.sort((val1: number, val2: number) => val1 > val2 ? 1 : -1)
    let remainder = sum
    
    const denominations = denominationInDecOreder.mapKeys((den) => {
        if (den < sum) {
            remainder -= sum
        } 
    })

    return denominations
       
}


console.log(isHasChange(randomCacheGenerator(), 5000))