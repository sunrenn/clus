
export function randomChar(stri = "") {
    let charcode = 0;
    for (let i = 0; i < stri.length; i++) {
        charcode += stri[i].charCodeAt();
    }
    return charcode;

}