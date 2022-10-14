
function rangeValue(arr,range=101){
  for (let i=0;i<arr.length;i++){
    arr[i] = mathRound(arr[i]%range,0);
  }
  return arr;
}

function mathRound(val,decimalPlaces=2){
  return(Number((((Math.round(val*(10**decimalPlaces)))/(10**(decimalPlaces))).toFixed(decimalPlaces))));
}

function deepClone2(obj) {
    var _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone;
}

function cloneChild(n = 2, parentObj, targetObj, idtemplate) {
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