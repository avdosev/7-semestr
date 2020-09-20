
function cyfr(encryptedString, key, type) {

    const blocks = encryptedString.match(/.{1,2}/g); // тут пока не переменное число
    const isEven = encryptedString.length % key.length === 0
   
    const memo2 = type === "encrypt" ? encrypt(blocks, isEven, key) : decrypt(blocks, isEven, key) 

    // console.log(memo2)

    const res = memo2.join("")

    return res

}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function code(blocks, isEven) {
    // console.log("Input", blocks);

    const removed = !isEven ? blocks.splice(-1,1)[0] : []

    const memo2 = blocks.reverse()

    const res = []
    for (let i=0; i<memo2.length; i++) {
        res.push(memo2[i])
    }

    if (!isEven) {
        res.push(removed)
    }

    return res
}


function encrypt(blocks, isEven, key) {
    return code(blocks, isEven)
}

function decrypt(blocks, isEven,  key) {
    return code(blocks, isEven)

}



const edit = "3241"

const memo1 = "Иван Петрович"


const encrypted = cyfr(memo1, edit, "encrypt")


console.log("Зашифрованный текст:", encrypted);

console.log("Расшифрованный текст:", cyfr(encrypted, edit, "decrypt"));


