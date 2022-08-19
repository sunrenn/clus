
function deepClone2(obj) {
    var _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone;
}

export function cloneChild(n = 2, parentObj, targetObj, idtemplate) {
    if (document.querySelector(parentObj)) {
        let item_parent = document.querySelector(parentObj);
        let item_needTobeClone = document.querySelector(targetObj);
        for (var i = 0; i < n; i++) {
            let item_Cloned = item_needTobeClone.cloneNode(true);
            item_Cloned.id = idtemplate + (i + 2);
            item_parent.appendChild(item_Cloned);
        }
    }
}