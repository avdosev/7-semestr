
function cyfr(encryptedString, key, type) {

    const blocks = encryptedString.match(/.{1,4}/g); // тут пока не переменное число
    const lengthOfMemo2 = encryptedString.length % key.length !== 0 ?  blocks.length-1 : blocks.length
   
    const memo2 = type === "encrypt" ? encrypt(blocks, lengthOfMemo2, key) : decrypt(blocks, lengthOfMemo2, key) 

    console.log(memo2);

    if ( encryptedString.length % key.length !== 0) {
        memo2.push([blocks[blocks.length-1]])
    }

    const res = memo2.map((block) => block.join("")).join("")

    return res

}


function encrypt(blocks, memoLength, key) {

    const memo2 = []

    for(let j=0; j<memoLength; j++) { // для всех блоков, кроме последнего
        const cyfredBlockJ = []
        for(let i=0; i<key.length; i++) { // шифрование для блока i
            const key1 = key[i]-1
            cyfredBlockJ.push(blocks[j][key1])
        }
        memo2.push(cyfredBlockJ)
    }

    return memo2
}

function decrypt(blocks, memoLength,  key) {
    const memo2 = []
    
    // 3241 -> 3102
    key = "4213"

    for(let j=0; j<memoLength; j++) { // для всех блоков, кроме последнего
        const cyfredBlockJ = []
        for(let i=0; i<key.length; i++) { // шифрование для блока i
            const key1 = key[i]-1
            cyfredBlockJ[i] = blocks[j][key1]
        }
        memo2.push(cyfredBlockJ)
    }
    return memo2
}



const edit = "3241"

const memo1 = "Иван Петрович"


const encrypted = cyfr(memo1, edit, "encrypt")


console.log("Зашифрованный текст:", encrypted);

console.log("Расшифрованный текст:", cyfr(encrypted, edit, "decrypt"));




