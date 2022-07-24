

export function trueTypeOf = (obj) => {
    Object.prototype.toString.call(obj);
    // const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

    // console.log("p","string: "+trueTypeOf(''));
    // console.log("p","number: "+trueTypeOf(0));
    // console.log("p","undefined: "+trueTypeOf());
    // console.log("p","null: "+trueTypeOf(null));
    // console.log("p","object: "+trueTypeOf({}));
    // console.log("p","array: "+trueTypeOf([]));
    // console.log("p","number: "+trueTypeOf(0));
    // console.log("p","number: "+trueTypeOf(() => {}));
}
