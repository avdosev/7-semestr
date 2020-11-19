
export function numDigits(x: number) {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
}