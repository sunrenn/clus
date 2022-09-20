

export function trueTypeOf = (obj) => {
    Object.prototype.toString.call(obj);
    // const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

}
