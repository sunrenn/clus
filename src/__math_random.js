export function randomRange(num1, num2, isInt = true) {
    let numx = num2 - num1;
    let x = Math.random() * numx + num1;
    if (isInt) {
        x = Math.floor(x);
    }
    return x;
}